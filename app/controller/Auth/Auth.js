/* global printgic */

const debug = require('debug');
const moment = require('moment');
const jwt = require('../../utils/jwt');
const db = printgic.database;
const utils = printgic.utils;



module.exports = {
    * create() {
        const log = debug('printgic:controller:auth:authenticate');
        const body = this.req.body;
        log('body', body);

        // let's validate the request body
        yield validateRegister(this);

        body.password = utils.hash(body.password);
        body.refresh_token = utils.uuidV4();

        const user = yield db.users.create(body);
        this.ok(user);

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
        yield validateSignin(this);

        const { email, password } = this.req.body;

        const user = yield db.users.find({
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
        response.expires_in_sec = moment.duration(expiresIn, 'minutes').asSeconds();
        this.ok(response);
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