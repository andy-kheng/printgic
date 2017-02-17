/* global printgic */
const debug = require('debug');
const db = printgic.database;
const url_path = process.env.URL_PATH;
const { category: Category, photo_size: PhotoSize } = db;

module.exports = {
    * listCategory() {
        let log = debug('printgic:controller:category:list-category');
        const { limit, offset } = this.req.body;

        log('url_path', url_path);
        const categories = yield Category.findAll({
            limit: +limit || this.limit,
            offset: +offset || this.offset
        });

        this.ok(categories);
    },
    * category_detail() {
        let log = debug('printgic:controller:category:list-category');
        const { category_id : category_id = +category_id } = this.params;

        let category = yield Category.findById(category_id);
        if(!category){
            this.bad({message: 'category does not exist.'});
            return;
        }

        category = category.toJSON();
        const photo_sizes = yield PhotoSize.findAll({
            where: { category_id }
        });
        category.photo_sizes = photo_sizes;

        this.ok(category);
    }
};
