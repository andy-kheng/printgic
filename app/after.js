const debug = require('debug');

const db = printgic.database = require('./utils/database');

module.exports = {
    model() {
        const log = debug('printgic:after:model');
        db.sequelize
            .query('SET FOREIGN_KEY_CHECKS = 0', {
                raw: true,
                logging: false
            })
            .then(() => {
                db.sequelize
                    .sync({
                        force: false,
                        logging: false
                    });
            });
    },
    app() {},
    database() {},
    socket() {},
    controller() {},
    filter() {},
    route() {},
    service() {}
};
