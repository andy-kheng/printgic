const debug = require('debug');
const db = require('./database');

module.exports = {
    uniqueEmail(data, field, message, args, get) {
        const log = debug('printgic:custom_rules:uniqueEmail');
        return new Promise((resolve, reject) => {
            const email = get(data, field);
            // log('field', field);
            // log('message', message);
            // log('args', args);
            // log('data', data);
            // log('emailValue', email);
            if (!email) return resolve('validation skipped');
            db.users
                .find({
                    where: { email }
                })
                .then(user => {
                    if (user) {
                        return reject('Email is taken');
                    }
                    return resolve('validation passed');
                })
                .catch(error => reject(error));
        });

    }
};