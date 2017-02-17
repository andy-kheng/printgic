/**
 * @api {GET} /category List category
 * @apiName list-category
 * @apiGroup Category
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 * [
 *   {
 *     "id": 1,
 *     "name": "Print Photos",
 *     "description": "",
 *     "category_banner": "",
 *     "created_date": "2017-02-07T02:47:06.000Z",
 *     "updated_date": "2017-02-07T02:47:06.000Z"
 *   },
 *   {
 *     "id": 2,
 *     "name": "Print Album",
 *     "description": null,
 *     "category_banner": null,
 *     "created_date": "2017-02-07T02:47:06.000Z",
 *     "updated_date": "2017-02-07T02:47:06.000Z"
 *   },
 *   {
 *     "id": 3,
 *     "name": "Collage",
 *     "description": null,
 *     "category_banner": null,
 *     "created_date": "2017-02-07T02:47:06.000Z",
 *     "updated_date": "2017-02-07T02:47:06.000Z"
 *   },
 *   {
 *     "id": 4,
 *     "name": "Beauty",
 *     "description": null,
 *     "category_banner": null,
 *     "created_date": "2017-02-07T02:47:06.000Z",
 *     "updated_date": "2017-02-07T02:47:06.000Z"
 *   },
 *   {
 *     "id": 5,
 *     "name": "Enhance",
 *     "description": null,
 *     "category_banner": null,
 *     "created_date": "2017-02-07T02:47:06.000Z",
 *     "updated_date": "2017-02-07T02:47:06.000Z"
 *   }
 * ]
 */
/**
 * @api {GET} /category/:category_id Category detail
 * @apiName category-detail
 * @apiGroup Category
 * @apiParam {Integer} category_id id of category
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "id": 1,
 *   "name": "Print Photos",
 *   "description": "",
 *   "category_banner": "",
 *   "created_date": "2017-02-07T02:47:06.000Z",
 *   "updated_date": "2017-02-07T02:47:06.000Z",
 *   "photo_sizes": [
 *     {
 *       "id": 1,
 *       "category_id": 1,
 *       "width": "4",
 *       "height": "4",
 *       "type": "square",
 *       "description": "Minimum 12 Photos",
 *       "photo_size_banner": "",
 *       "created_date": "2017-02-07T02:47:06.000Z",
 *       "updated_date": "2017-02-07T02:47:06.000Z"
 *     },
 *     {
 *       "id": 2,
 *       "category_id": 1,
 *       "width": "4",
 *       "height": "6",
 *       "type": "rectangle",
 *       "description": "Minimum 12 Photos",
 *       "photo_size_banner": "",
 *       "created_date": "2017-02-07T02:47:06.000Z",
 *       "updated_date": "2017-02-07T02:47:06.000Z"
 *     }
 *   ]
 * }
 */
/**
 * @api {GET} /photo_size/:photo_size_id Photo size detail
 * @apiName photo_size-detail
 * @apiGroup Category
 * @apiParam {Integer} photo_size_id id of photo_size
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 *{
 *  "id": 1,
 *  "category_id": 1,
 *  "width": "4",
 *  "height": "4",
 *  "type": "square",
 *  "description": "Minimum 12 Photos",
 *  "photo_size_banner": "",
 *  "created_date": "2017-02-07T02:47:06.000Z",
 *  "updated_date": "2017-02-07T02:47:06.000Z",
 *  "photo_size_items": [
 *    {
 *      "id": 1,
 *      "price": "1.5",
 *      "total_photo": "12"
 *    },
 *    {
 *      "id": 2,
 *      "price": "2.5",
 *      "total_photo": "24"
 *    },
 *    {
 *      "id": 3,
 *      "price": "3.5",
 *      "total_photo": "36"
 *    },
 *    {
 *      "id": 4,
 *      "price": "4.5",
 *      "total_photo": "48"
 *    }
 *  ]
 *}
 */
