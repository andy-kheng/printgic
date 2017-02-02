/* global printgic */
const Promise = require('bluebird');
const debug = require('debug');
const gm = require('gm').subClass({ imageMagick: true });
const path = require('path');
const uuid = require('node-uuid');
const progress = require('progress-stream');
const fs = require('fs');
const db = printgic.database;

Promise.promisifyAll(gm.prototype);

module.exports = {
    * create() {
        console.log('start ------------------');
        this.ok();
        let urlImage = this.req.headers.host + '/uploads/';
        let log = debug('printgic:controller:upload:create');
        let files = this.req.file;
        let body = this.req.body;
        console.log('file', files);
        console.log('body', body);
        let { width, height } = this.req.body;
        if (!files) return this.bad({ message: 'file is required' });

        const filePath = files.path;

        // let pathImage = path.resolve(__dirname, '../../public/uploads/' + uuid.v4() + path.basename(filePath));
        let pathImage = path.resolve(__dirname, '../../public/uploads/scaled-' + path.basename(filePath));

        try {
            let result = yield gm(filePath)
                .scale(width, height, '!')
                .writeAsync(pathImage);
            let success = {
                original_path: urlImage + path.basename(filePath),
                scaled_path: urlImage + path.basename(pathImage)
            };

            printgic.memStore.share.publish('CHN:adsfe', JSON.stringify(success));
            this.ok(success);
        } catch (err) {
            this.bad({ mesage: err.message });
        }
    },
    * upload() {
        let urlImage = this.req.headers.host + '/uploads/';
        const dir = path.resolve(__dirname, '../../public/uploads') + '/';
        let log = debug('printgic:controller:upload:create');
        let files = this.req.file;
        let { width, height, position_x, position_y } = this.req.body;
        if (!files) return this.bad({ message: 'file is required' });
        yield validateUpload(this);

        const filePath = files.path;

        const new_path = dir + 'c_' + Date.now() + '.png';
        yield gm(filePath)
            .crop(width, height, position_x, position_y)
            .quality(100)
            .autoOrient()
            .writeAsync(new_path);
        let success = {
            image_path: urlImage + path.basename(new_path)
        };
        return this.ok(success);
    },
    * test() {
        let urlImage = this.req.headers.host + '/uploads/';
        const dir = path.resolve(__dirname, '../../public/uploads') + '/';
        let log = debug('printgic:controller:upload:upload');
        let pathImage = path.resolve(__dirname, '../../public/uploads/test2.png');
        // let origin = path.resolve(__dirname, '../../public/uploads/upload_3b3767ed848ca0ea898280394148de72.png');
        // let files = this.req.files;
        // console.log(files);
        let { width, height } = this.req.body;
        //if (!files) return this.bad({ message: 'file is required' });

        yield gm(`${dir}k.png`)
            .resize(200, 200, '!')
            .writeAsync(`${dir}cicle.png`);

        // yield gm(200, 200, 'none')
        //     .fill(`${dir}cicle.png`)
        //     .stroke("#94E81E")
        //     .drawCircle(200 / 2, 200 / 2, 200 / 2, 0)
        //     .writeAsync(`${dir}cicle.png`);

        yield gm(200, 200, '#ffffff')
            .fill(`${dir}cicle.png`)
            .stroke("#94E81E", 5)
            .drawRectangle(3, 3, 200 / 1.02, 200 / 1.02, 5, 5)
            .writeAsync(`${dir}cicle.png`);

        this.ok();

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
    },
    * collage() {
        let urlImage = this.req.headers.host + '/uploads/';
        const dir = path.resolve(__dirname, '../../public/uploads') + '/';
        let log = debug('printgic:controller:upload:upload');
        let pathImage = path.resolve(__dirname, '../../public/uploads/collage_test.png');

        // ---------------- query layout ----------
        let layout = yield db.layout.find({
            attributes: {
                exclude: ['name', 'description', 'user_id', 'created_date', 'updated_date', 'status']
            }
        });
        layout = layout.toJSON();
        let layout_item = yield db.layout_item.findAll({
            attributes: {
                exclude: ['layout_id', 'created_date', 'updated_date', 'status']
            },
            where: { layout_id: layout.id },
            raw: true
        });
        layout.layout_item = layout_item;
        // ------------------------------------------

        let image_path = dir + 'pic4.png';
        try {
            yield gm(layout.width, layout.height, layout.background_color)
                .writeAsync(pathImage);

            let images = layout.layout_item;
            for (let i in images) {
                let image = images[i];
                let positions = image.position.split('|');
                let position = positions[0].split('-');

                yield gm(image_path)
                    .resize(image.width, image.height, '!')
                    .blur(10, 10)
                    .quality(100)
                    .writeAsync(image_path);

                yield gm(pathImage)
                    .composite(image_path)
                    .geometry(`+${position[0]}+${position[1]}`)
                    .quality(100)
                    .writeAsync(pathImage);

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

const validateUpload = function*(ctx) {
    return yield ctx.req.validate(ctx.req.body, {
        'width': 'required',
        'height': 'required',
        'position_x': 'required',
        'position_y': 'required'
    }, {});
};