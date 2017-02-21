/* global printgic */
const debug = require('debug');
const db = printgic.database;
const { photo_size: PhotoSize, photo_size_item: PhotoSizeItem } = db;
const urlImage = 'http://192.168.17.89:4000/';
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
        if(photo_size.photo_size_banner){
            photo_size.photo_size_banner = urlImage+ photo_size.photo_size_banner;
        }
        const photo_size_items = yield PhotoSizeItem.findAll({
            where: { photo_size_id },
            attributes: {
                exclude: ['photo_size_id', 'created_date', 'updated_date']
            }
        });
        photo_size.photo_size_items = photo_size_items;

        this.ok(photo_size);
    },

    * listPhotoSizeByCategory() {
        let log = debug('printgic:controller:category:list-photo-size-by-category');
        const { category_code } = this.params;

        const photo_sizes = yield PhotoSize.findAll({
            where: {category_code}
        });

        if(photo_sizes){
            for (let i = 0; i < photo_sizes.length; i++) {
                photo_sizes[i] = photo_sizes[i].toJSON();
                if (photo_sizes[i].photo_size_banner)
                    photo_sizes[i].photo_size_banner = urlImage + photo_sizes[i].photo_size_banner;
            }
        }

        this.ok(photo_sizes);
    }
};
