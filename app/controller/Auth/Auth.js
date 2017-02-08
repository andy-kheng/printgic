/* global printgic */

const debug = require('debug');
const moment = require('moment');
const jwt = require('../../utils/jwt');
const db = printgic.database;
const utils = printgic.utils;
const expiresIn = 15500;



module.exports = {
    * register() {
        const log = debug('printgic:controller:auth:authenticate');
        const body = this.req.body;
        log('body', body);

        // let's validate the request body
        yield validateRegister(this);

        body.password = utils.hash(body.password);
        body.refresh_token = utils.uuidV4();

        const user = yield db.user.create(body);
        this.ok(user);

    },
    * refreshToken() {
        const log = debug('printgic:controller:auth:verify');
        const { 'refresh-token': refresh_token } = this.req.headers;

        // we need the refresh_token header
        if (!refresh_token) {
            this.bad({ message: 'refresh_token header is missing' });
            return;
        }

        const [tokenType, token] = refresh_token.split(/ /);
        if (tokenType !== 'Bearer') {
            this.bad({ message: 'refresh_token type is invalid' });
            return;
        }

        const user = yield db.user.find({
            where: { refresh_token: token },
            raw: true
        });
        log('user: ------', user);

        if (!user) {
            throw this.bad({ message: 'refresh_token does not exist' });
        }
        const response = {
            email: user.email,
            username: user.username,
            phone_number: user.phone_number
        };

        try {
            response.access_token = yield jwt.signAsync(response, expiresIn);
            response.refresh_token = user.refresh_token;
            response.expires_in_sec = moment.duration(expiresIn, 'minutes').asSeconds();
            this.ok(response);
        } catch (err) {
            this.bad({ message: err.message });
        }
    },
    * signin() {
        const log = debug('printgic:controller:auth:signin');

        // let's validate the request body
        yield validateSignin(this);

        const { email, password } = this.req.body;

        const user = yield db.user.find({
            where: {
                $or: [{ email }, { username: email }]
            },
            raw: true
        });
        log('user: ------', user);

        if (!user) {
            throw this.bad({ message: 'email or username does not exist' });
        }

        if (user.password !== utils.hash(password)) {
            throw this.bad({ message: 'password in correct' });
        }

        const response = {
            email,
            username: user.username,
            phone_number: user.phone_number
        };

        // log('data:   ', response);

        response.access_token = yield jwt.signAsync(response, expiresIn);
        response.refresh_token = user.refresh_token;
        // response.expires_in_sec = moment.duration(expiresIn, 'minutes').asSeconds();
        this.ok(response);
    },
    * socialSignin() {
        const log = debug('printgic:controller:auth:socialSignin');
        let user;
        // let's validate the request body
        yield validateSocialSignin(this);

        const body = this.req.body;
        let social = yield db.user_social.find({
            where: {
                secret_key: body.secret_key
            }
        });
        if(!social){
            // body.password = utils.hash(body.password);
            body.refresh_token = utils.uuidV4();
            let check_user = yield db.user.find({
                where: {
                    email: body.email
                }
            });
            if(!check_user){
                user = yield db.user.create(body);
            }else{
                user = yield db.user.update(body, {
                    where: {
                        id: check_user.id
                    }
                });
                user = yield db.user.findById(check_user.id);
            }
            const data_user_social = {
                token: body.token,
                social_page_cd: body.social_page_cd,
                secret_key: body.secret_key,
                user_id: user.id
            };
            social = yield db.user_social.create(data_user_social);
        }else{
            user = yield db.user.update({
                username: body.username || null,
                sex: body.sex || null,
                image_url: body.image_url || null
            }, {
                where: {
                    id: social.user_id
                },
                raw: true
            });
            user = yield db.user.findById(social.user_id);
        }
        user = user.toJSON();
        user.expires_in_sec = undefined;
        const data_login = {
            email: user.email,
            username: user.username,
            phone_number: user.phone_number
        };
        user.access_token = yield jwt.signAsync(data_login, expiresIn);
        this.ok(user);
    }
};

const validateRegister = function*(ctx) {
    return yield ctx.req.validate(ctx.req.body, {
        'email': 'required|email|unique_email',
        'password': 'required|alpha_numeric'
    }, {
        'email.required': 'The email field is required',
        'password.required': 'The password field is required'
    });
};

const validateSignin = function*(ctx) {
    return yield ctx.req.validate(ctx.req.body, {
        'email': 'required',
        'password': 'required|alpha_numeric'
    }, {
        'email.required': 'The email field is required',
        'password.required': 'The password field is required'
    });
};

const validateSocialSignin = function*(ctx) {
    return yield ctx.req.validate(ctx.req.body, {
        'token': 'required',
        // 'password': 'required',
        'secret_key': 'required',
        'social_page_cd': 'required'
    });
};
