/* global printgic */

const debug = require('debug')
const moment = require('moment')

const db = printgic.database
const hashSHA1 = require('../../utils/sha1')
const jwt = require('../../utils/jwt')

module.exports = {
    * create() {
        const log = debug('printgic:controller:auth:authenticate')
        const expiresIn = 120
        // let's validate the request body
        if (yield hasErrors(this)) return;
        const {email, phonenumber, password} = this.body;
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
                phonenumber,
                password
            };

            payload.refresh_token = yield jwt.signAsync(payload, expiresIn);
            payload.expires_in_sec = moment.duration(expiresIn, 'minutes').asSeconds();
            const user = yield db.users.create(payload);
            log('client', payload);
            this.ok(payload);
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
        try{
            const client = yield jwt.verifyAsync(authentication);
            log('client', client);
            this.ok(client);
        }catch(err) {
            this.bad({ message: err.message });
        }
    }
}

const hasErrors = function * (ctx) {
    return yield ctx.req.validate(ctx.body, {
        'email': 'required|email',
        'password': 'required|alpha_numeric'
        }, {
        'email.required': 'The email field is required',
        'password.required': 'The password field is required'
        });
}
