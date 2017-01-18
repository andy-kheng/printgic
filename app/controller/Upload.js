/* global printgic */
const Promise = require('bluebird');
const debug = require('debug');
const gm = require('gm');
const path = require('path');
const uuid = require('node-uuid');
const progress = require('progress-stream');
const fs = require('fs');


Promise.promisifyAll(gm.prototype);

module.exports = {
    * create() {
        console.log('start ------------------');
        let urlImage = this.req.headers.host + '/uploads/';
        let log = debug('printgic:controller:upload:create');
        let files = this.req.files;
        let { width, height } = this.req.fields;
        if (!files) return this.bad({ message: 'file is required' });

        const filePath = files.file.path;

        // let pathImage = path.resolve(__dirname, '../../public/uploads/' + uuid.v4() + path.basename(filePath));
        let pathImage = path.resolve(__dirname, '../../public/uploads/scaled-' + path.basename(filePath));

        try {
            let result = yield gm(filePath)
                .scale(width, height, '!')
                .writeAsync(pathImage);
            let success = {
                success: true,
                file: {
                    original_path: urlImage + path.basename(filePath),
                    scaled_path: urlImage + path.basename(pathImage)
                }
            };
            printgic.memStore.share.publish('CHN:adsfe', JSON.stringify(success));
            this.ok(success);
        } catch (err) {
            this.bad({ mesage: err.message });
        }
    },
    * upload() {
        let urlImage = this.req.headers.host + '/uploads/';
        let log = debug('printgic:controller:upload:upload');
        let file = this.req.file;
        let { width, height } = this.body;

        let pathImage = path.resolve(__dirname, '../../public/uploads/' + uuid.v4() + file.originalname)
        try {
            let result = yield gm(file.buffer, file.originalnamer)
                .highlightColor("red")
                .writeAsync(pathImage);
            let success = {
                success: true,
                file: {
                    path: urlImage + path.basename(pathImage)
                }
            };
            this.ok(success);
        } catch (err) {
            this.bad({ mesage: err.message });
        }
    },
    * test() {
        let urlImage = this.req.headers.host + '/uploads/';
        let log = debug('printgic:controller:upload:upload');
        let pathImage = path.resolve(__dirname, '../../public/uploads/test.jpg');
        let origin = path.resolve(__dirname, '../../public/uploads/upload_3b3767ed848ca0ea898280394148de72.png');
        try {
            let result = yield gm()
                .in('-page', '+0+0') // Custom place for each of the images
                .in(origin)
                .in('-page', '+256+0')
                .in(origin)
                .in('-page', '+0+256')
                .in(origin)
                .in('-page', '+256+256')
                .in(origin)
                .minify() // Halves the size, 512x512 -> 256x256
                .mosaic() // Merges the images as a matrix
                .writeAsync(pathImage);
            // let result = yield gm(origin)
            //     .append(origin)
            //     // .minify() // Halves the size, 512x512 -> 256x256
            //     // .mosaic() // Merges the images as a matrix
            //     .writeAsync(pathImage);


            let success = {
                success: true,
                file: {
                    path: urlImage + path.basename(pathImage)
                }
            };
            this.ok(success);
        } catch (err) {
            this.bad({ mesage: err.message });
        }
    }
};