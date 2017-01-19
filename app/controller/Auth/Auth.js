/* global printgic */

const debug = require('debug');
const moment = require('moment');
const hashSHA1 = require('../../utils/sha1');
const jwt = require('../../utils/jwt');
const db = printgic.database;
const utils = printgic.utils;



module.exports = {
    * create() {
        const log = debug('printgic:controller:auth:authenticate');
        const expiresIn = 120;
        // let's validate the request body
        if (yield hasErrors(this)) return;
        const { email, username, phone_number, password } = this.req.fields;
        const client = yield db.users.find({
            attributes: {
                exclude: ['email', 'refresh_token']
            },
            where: { email: email },
            raw: true
        });

        if (!client) {
            const payload = {
                email,
                username,
                phone_number,
                password: utils.hash(password)
            };

            payload.refresh_token = yield jwt.signAsync(payload, expiresIn);
            payload.expires_in_sec = moment.duration(expiresIn, 'minutes').asSeconds();
            let user = yield db.users.create(payload);
            user = user.toJSON();
            log('client', user);
            this.ok(user);
        } else {
            log(`Existing Email Address`);
            this.bad({ message: 'Existing Email Address' });
        }

    },
    * verify() {
        const log = debug('printgic:controller:auth:verify');
        const { authentication } = this.req.headers;
        const expiresIn = 120;

        // we need the authentication header
        if (!authentication) {
            this.bad({ message: 'Authentication header is missing' });
            return;
        }
        try {
            const client = yield jwt.verifyAsync(authentication);
            log('client', client);
            this.ok(client);
        } catch (err) {
            this.bad({ message: err.message });
        }
    },
    * signin() {
        const log = debug('printgic:controller:auth:signin');
        const expiresIn = 500;
        // let's validate the request body
        if (yield validateSignin(this)) return;
        const { email, password } = this.req.fields;

        let user = yield db.users.find({
            where: {
                $or: [{
                    email: email
                }, {
                    username: email
                }],
                password: utils.hash(password)
            }
        });
        log('user: ------', user);
        if (!user) {
            this.bad({ message: "Email or Password incorrect" });
        } else {
            user = user.toJSON();
            const payload = {
                email,
                username: user.username,
                phone_number: user.phone_number,
                password: user.password
            };
            log('data:   ', payload);

            payload.refresh_token = yield jwt.signAsync(payload, expiresIn);
            payload.expires_in_sec = moment.duration(expiresIn, 'minutes').asSeconds();
            this.ok(user);
        }
    }
};


const validateRegister = function*(ctx) {
    return yield ctx.req.validate(ctx.req.fields, {
        'email': 'required|email',
        'password': 'required|alpha_numeric'
    }, {
        'email.required': 'The email field is required',
        'password.required': 'The password field is required'
    });
};

const validateSignin = function*(ctx) {
    return yield ctx.req.validate(ctx.req.fields, {
        'email': 'required',
        'password': 'required|alpha_numeric'
    }, {
        'email.required': 'The email field is required',
        'password.required': 'The password field is required'
    });
};