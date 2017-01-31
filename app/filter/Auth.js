/* global printgic */

const debug = require('debug');

const db = printgic.database;
const jwt = require('../utils/jwt');

module.exports = {
    /**
     * Checks if client is authorized
     */
    authorized() {
        /*if (!this.req.client.authorized) {
            this.res.status(403).json({ message: 'Unauthorized' });
            return;
        }*/
    },
    /**
     * Checks if client is authenticated
     */
    * authenticated() {
        const log = debug('printgic:filter:auth:authenticated');
        const { 'x-auth': xAuth } = this.req.headers;

        if (!xAuth) {
            this.bad({ message: 'X-Auth header is missing' });
            return;
        }
        log(`X-Auth: ${xAuth}`);

        const [tokenType, token] = xAuth.split(/ /);
        if (tokenType !== 'Bearer') {
            this.bad({ message: 'Access token type is invalid' });
            return;
        }
        try {
            const result = yield jwt.verifyAsync(token);
            log('result ', result);
            const client = yield db.user.find({
                where: { email: result.email }
            });
            if (client) {
                this.auth = client.toJSON();
            } else {
                this.bad({ message: 'Client was not found' });
            }
        } catch ({ name: errorName }) {
            log(`Error ${errorName}`);
            if (errorName === 'JsonWebTokenError') {
                this.bad({ message: 'Access token is invalid' });
            } else if (errorName === 'TokenExpiredError') {
                this.bad({ message: 'Access token has expired' });
            } else {
                this.bad({ message: 'Unable to verify access token' });
            }
        }
    }
};