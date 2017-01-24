const bodyParser = require('body-parser');
const co = require('co');
const device = require('express-device');
const multer = require('multer');
const formidable = require('express-formidable');
const path = require('path');
const validator = require('./middleware/validator');

module.exports = {
    model() {},
    app() {
        printgic.components.app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        printgic.components.app.use(device.capture());
        printgic.components.app.use(formidable({
            encoding: 'utf-8',
            keepExtensions: true,
            uploadDir: path.resolve(__dirname, '../public/uploads'),
            // multiples: true, // req.files to be arrays of files
        }));
        // printgic.components.app.use(multer().single('file'));
        // printgic.components.app.use(bodyParser.json({ limit: '20mb' }));
        printgic.components.app.use(validator);
    },
    database() {},
    socket() {
        printgic.socket.io.use(co.wrap(function*(socket, next) {
            console.log("Socket Connected");
            let query = socket.handshake.query;
            let hash = query.hash;
            // if (hash) {
            //     let authToken = yield User.find({
            //         where: {
            //             hash: hash
            //         }
            //     });
            //     if (!authToken) {
            //         next(new Error("Fail authenticate"));
            //     } else {
            //         socket.request.auth = authToken.toJSON();
            //         socket.user = authToken.toJSON();
            //         next();
            //     }
            // }

            socket.request.auth = {
                published_code: "adsfe"
            };
            next();
        }));
    },
    controller() {},
    filter() {},
    route() {},
    service() {}
};