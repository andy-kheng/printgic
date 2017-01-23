/* global printgic */
const Promise = require('bluebird');
const debug = require('debug');
const gm = require('gm');
const path = require('path');
const uuid = require('node-uuid');
const progress = require('progress-stream');
const fs = require('fs');
const image_size = require('image-size');
let co = require('co');

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
        yield gm(dir + 'test.png')
            .composite(value.image)
            .geometry(`+${value.x}+${value.y}`)
            .writeAsync(pathImage);
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
        const dir = path.resolve(__dirname, '../../public/uploads') + '/';
        let log = debug('printgic:controller:upload:upload');
        let pathImage = path.resolve(__dirname, '../../public/uploads/test2.png');
        // let origin = path.resolve(__dirname, '../../public/uploads/upload_3b3767ed848ca0ea898280394148de72.png');
        // let files = this.req.files;
        // console.log(files);
        let { width, height } = this.req.fields;
        //if (!files) return this.bad({ message: 'file is required' });

        //const filePath = files.file.path;
        // let background = dir + 'test.png';
        // let images = {
        //     0: {
        //         'image': `${dir}k.png`,
        //         'x': 35,
        //         'y': 42
        //     },
        //     1: {
        //         'image': `${dir}k1.png`,
        //         'x': 298,
        //         'y': 42
        //     },
        //     2: {
        //         'image': `${dir}k1.png`,
        //         'x': 564,
        //         'y': 42
        //     },
        //     3: {
        //         'image': `${dir}k.png`,
        //         'x': 829,
        //         'y': 42
        //     }

        // };

        let background = dir + 'c.png';
        let images = {
            0: {
                'image': `${dir}c2.png`,
                'x': 116,
                'y': 45,
                'width': 185,
                'height': 111
            },
            1: {
                'image': `${dir}c9.png`,
                'x': 483,
                'y': 45,
                'width': 185,
                'height': 111
            },
            2: {
                'image': `${dir}cc.png`,
                'x': 817,
                'y': 46,
                'width': 115,
                'height': 172
            },
            3: {
                'image': `${dir}ck.png`,
                'x': 311,
                'y': 186,
                'width': 115,
                'height': 114
            },
            4: {
                'image': `${dir}c6.png`,
                'x': 651,
                'y': 186,
                'width': 115,
                'height': 114
            },
            5: {
                'image': `${dir}c1.png`,
                'x': 107,
                'y': 267,
                'width': 115,
                'height': 172
            },
            6: {
                'image': `${dir}cc.png`,
                'x': 482,
                'y': 268,
                'width': 115,
                'height': 172
            },
            7: {
                'image': `${dir}c4.png`,
                'x': 706,
                'y': 333,
                'width': 185,
                'height': 111
            },
            8: {
                'image': `${dir}c7.png`,
                'x': 876,
                'y': 245,
                'width': 113,
                'height': 113
            }

        };

        try {
            // yield gm(width, height, "#ffffff")
            //     .writeAsync(pathImage);
            // let result = yield gm()
            //     .in('-page', '+0+0')
            //     .in(dir + 'test.png')
            //     .in('-page', '+35+42') // Custom place for each of the images
            //     .in(image[0])
            //     .resize(254, 407, "!")
            //     .in('-page', '+298+42') // Custom place for each of the images
            //     .in(image[1])
            //     .resize(254, 407, "!")
            //     .in('-page', '+564+42') // Custom place for each of the images
            //     .in(image[2])
            //     .resize(254, 407, "!")
            //     .in('-page', '+829+42') // Custom place for each of the images
            //     .in(image[3])
            //     // .resize(254, 407, "!")
            //     .minify() // Halves the size, 512x512 -> 256x256
            //     .mosaic() // Merges the images as a matrix
            //     .writeAsync(pathImage);


            // let result = yield gm()
            //     .in('-page', '+10+10') // Custom place for each of the images
            //     .in(filePath)
            //     .in('-page', `+${image.width + 20}+10`)
            //     .in(filePath)
            //     .in('-page', `+10+${image.height +20}`)
            //     .in(filePath)
            //     .in('-page', `+${image.width+ 20}+${image.height+ 20}`)
            //     .in(filePath)
            //     .minify() // Halves the size, 512x512 -> 256x256
            //     .mosaic() // Merges the images as a matrix
            //     .writeAsync(pathImage);

            // let result = yield gm(filePath)
            //     .append(filePath)
            //     // .minify() // Halves the size, 512x512 -> 256x256
            //     // .mosaic() // Merges the images as a matrix
            //     .writeAsync(pathImage);
            for (let i in images) {
                let image = images[i];
                yield gm(image.image)
                    .resize(image.width, image.height, '!')
                    .quality(100)
                    .writeAsync(image.image);

                if (i == 0) {
                    yield gm(background)
                        .composite(image.image)
                        .geometry(`+${image.x}+${image.y}`)
                        // .in('-page', `+0+0`)
                        // .in(background)
                        // .in('-page', `+${image.x}+${image.y}`)
                        // .in(image.image)
                        .quality(100)
                        // .mosaic()
                        .writeAsync(pathImage);
                } else {
                    yield gm(pathImage)
                        .composite(image.image)
                        .geometry(`+${image.x}+${image.y}`)
                        // .out('-page', `+0+0`)
                        // .out(pathImage)
                        // .out('-page', `+${image.x}+${image.y}`)
                        // .out(image.image)
                        .quality(100)
                        // .mosaic()
                        .writeAsync(pathImage);
                }
            }

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