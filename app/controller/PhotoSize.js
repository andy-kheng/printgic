/* global printgic */
const debug = require('debug');
const db = printgic.database;
const { photo_size: PhotoSize, photo_size_item: PhotoSizeItem } = db;

module.exports = {
    * listPhotoSizeItem() {
        let log = debug('printgic:controller:category:list-photo-size-items');
        const { limit, offset } = this.req.body;
        const { photo_size_id: photo_size_id = +photo_size_id } = this.params;

        let photo_size = yield PhotoSize.findById(photo_size_id);
        if(!photo_size){
            this.bad({message: 'photo_size does not exist.'});
            return;
        }

        photo_size = photo_size.toJSON();
        const photo_size_items = yield PhotoSizeItem.findAll({
            where: { photo_size_id },
            attributes: {
                exclude: ['photo_size_id', 'created_date', 'updated_date']
            }
        });
        photo_size.photo_size_items = photo_size_items;

        this.ok(photo_size);
    }
};
