/* global printgic */
const debug = require('debug');
const db = printgic.database;
const { user: User} = db;
const randomstring = require('randomstring');
const utils = printgic.utils;
const mailer = require('../utils/mailer');


module.exports = {
    * recoverPassword() {
        let log = debug('printgic:controller:recover:recoverPassword');

        yield validateEmail(this);
        const {email} = this.req.body;
        let user = yield User.find({
            where: {
                email
            }
        });
        if(!user) throw this.bad({message: 'The email not found'});

        const recovery_code = randomstring.generate({ length: 8 });
        yield User.update({
            recovery_code
        }, {
            where: {email}
        });
        user = user.toJSON();
        user.recovery_code = recovery_code;
        this.ok({message: 'Please login to your email to get recovery code.'});
        yield mailer.resetPassword(user);
    },

    * getRecoverCode() {
        let log = debug('printgic:controller:recover:getRecoverCode');
        const recovery_code = this.params.recovery_code;
        if(!recovery_code) throw this.bad({message: 'The recovery_code field is missing'});

        const checkRecoveryCode = yield User.find({
            where: {
                recovery_code
            }
        });
        if(!checkRecoveryCode) throw this.bad({message: 'The recovery code is incorrect'});
        this.ok();
    },

    *setNewPassword() {
        let log = debug('printgic:controller:recover:setNewPassword');
        yield validatesetNewPassword(this);
        const {recovery_code, password} = this.req.body;
        const checkRecoveryCode = yield User.find({
            where: {
                recovery_code
            },
            logging: true
        });
        if(!checkRecoveryCode) throw this.bad({message: 'The recovery code is incorrect'});

        yield User.update({
            recovery_code: '',
            password: utils.hash(password)
        }, {
            where: {
                recovery_code
            }
        });
        this.ok({message: 'Set new password succesfully'});
    }
};

const validateEmail = function* (ctx) {
    return yield ctx.req.validate(ctx.req.body, {
        'email': 'required'
    });
};

const validatesetNewPassword = function* (ctx) {
    return yield ctx.req.validate(ctx.req.body, {
        'recovery_code': 'required',
        'password': 'required'
    });
};
