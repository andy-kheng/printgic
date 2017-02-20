/* global printgic */
const debug = require('debug');
const db = printgic.database;
const { category: Category, photo_size: PhotoSize } = db;

module.exports = {
    * listCategory() {
        let log = debug('printgic:controller:category:list-category');
        const urlImage = this.req.headers.host + '/';
        const { limit, offset } = this.req.body;
        const categories = yield Category.findAll({
            limit: +limit || this.limit,
            offset: +offset || this.offset
        });
        if(categories){
            for (let i = 0; i < categories.length; i++) {
                categories[i] = categories[i].toJSON();
                if (categories[i].category_banner)
                    categories[i].category_banner = urlImage + categories[i].category_banner;
            }
        }
        const result = {
            header_banner: urlImage+'files/MainMenu/First.jpg',
            categories
        };
        this.ok(result);
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
