/* global printgic */

const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));

const secret = printgic.app.config.secret;

module.exports = {
    * signAsync(payload, duration = 30) {
        return yield jwt.signAsync(payload, secret, { expiresIn: `${duration} minutes` });
    },
    * verifyAsync(token) {
        return yield jwt.verifyAsync(token, secret);
    }
};
