/* global printgic */
const Promise = require('bluebird');
const debug = require('debug');
const db = printgic.database;
const path = require('path');
const gm = require('gm');
const _ = require('lodash');
Promise.promisifyAll(gm.prototype);
const dir = path.resolve(__dirname, '../../public/uploads') + '/';
const urlImage = 'http://192.168.17.89:4000/uploads/';

module.exports = {
    * listCollage() {
        let log = debug('printgic:controller:upload:upload');
        const { limit, offset, max_photos, photo_size_id } = this.req.query;
        let where = {};

        if (max_photos) where.max_photos = max_photos;
        if (photo_size_id) where.photo_size_id = photo_size_id;

        let layout = yield db.layout.findAll({
            attributes: {
                exclude: ['name', 'description', 'user_id', 'created_date', 'updated_date', 'status']
            },
            where,
            limit: +limit || this.limit,
            offset: +offset || this.offset
        });

        for (let i = 0; i < layout.length; i++) {
            layout[i] = layout[i].toJSON();
            if (layout[i].background_image)
                layout[i].background_image = urlImage + layout[i].background_image;

            if (layout[i].layout_thumbnail)
                layout[i].layout_thumbnail = urlImage + layout[i].layout_thumbnail;

            let layout_id = layout[i].id;
            let layout_item = yield db.layout_item.findAll({
                attributes: {
                    exclude: ['layout_id', 'created_date', 'updated_date', 'status']
                },
                where: { layout_id }
            });

            layout[i].layout_item = layout_item;
        }

        this.ok(layout);
    },
    * collage() {
        let log = debug('printgic:controller:upload:upload');
        const layout_id = this.params.layout_id;
        if (!layout_id) return this.bad({ message: 'layout_id is required' });

        let layout = yield db.layout.find({
            attributes: {
                exclude: ['name', 'description', 'user_id', 'created_date', 'updated_date', 'status']
            },
            where: {
                id: layout_id
            }
        });
        if (!layout) {
            this.bad({ message: 'no data' });
            return;
        }
        layout = layout.toJSON();

        const layout_item = yield db.layout_item.findAll({
            attributes: {
                exclude: ['layout_id', 'created_date', 'updated_date', 'status']
            },
            where: { layout_id: layout.id },
            raw: true
        });
        if (layout.background_image)
            layout.background_image = urlImage + layout.background_image;

        layout.layout_item = layout_item;
        this.ok(layout);
    },
    * crateCollage() {
        const layout_id = this.params.layout_id;
        const body = this.req.body;
        const pathImage = path.resolve(__dirname, `../../public/files/collage/collage_test_${Date.now()}.png`);

        let arr_image = [];

        if (body.layout_items) {
            const item_image = body.layout_items;
            arr_image = _.keyBy(item_image, 'layout_item_id');
        }

        // ---------------- query layout ----------
        let layout = yield db.layout.find({
            attributes: {
                exclude: ['name', 'description', 'user_id', 'created_date', 'updated_date', 'status']
            },
            where: { id: layout_id }
        });

        if (!layout) {
            this.bad({ mesage: `cannot find layout with this id` });
            return;
        }

        layout = layout.toJSON();
        const layout_item = yield db.layout_item.findAll({
            attributes: {
                exclude: ['layout_id', 'created_date', 'updated_date', 'status']
            },
            where: { layout_id: layout.id },
            raw: true
        });
        layout.layout_item = layout_item;

        // ------------------------------------------

        try {
            if (layout.background_color) {
                yield gm(layout.width, layout.height, layout.background_color)
                    .writeAsync(pathImage);
            } else {
                yield gm(dir + layout.background_image)
                    .resize(layout.width, layout.height)
                    .writeAsync(pathImage);
            }


            const layout_items = layout.layout_item;
            for (let i in layout_items) {
                let image = layout_items[i];
                let positions = image.position.split('|');
                let position = positions[0].split('-');
                let layout_item_id = image.id;

                if (!arr_image[image.id]) {
                    this.bad({ mesage: `cannot find image_path of id: ${image.id}` });
                }
                const image_path = dir + path.basename(arr_image[image.id].image_path);

                yield gm(image_path)
                    .resize(image.width, image.height, '!')
                    .quality(100)
                    .writeAsync(image_path);

                yield gm(pathImage)
                    .composite(image_path)
                    .geometry(`+${position[0]}+${position[1]}`)
                    // .quality(100)
                    .writeAsync(pathImage);
            }

            const success = { image_path: urlImage + path.basename(pathImage) };
            this.ok(success);
        } catch (err) {
            this.bad({ mesage: err.message });
        }
    }
};
