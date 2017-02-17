/**
 * @api {GET} /photo_size/:photo_size_id Photo size detail
 * @apiName photo_size-detail
 * @apiGroup Photo size
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
/**
 * @api {GET} /photo_size/list-by-category-code/:category_code List photo size by category_code
 * @apiName list-photo_size-by-category_code
 * @apiGroup Photo size
 * @apiDescription About Parameter <code>:category_code</code> <br>
 * <ul>
 *     <li><code>print_photo</code> :  Print Photos</li>
 *     <li><code>print_album</code> : Print Album</li>
 *     <li><code>sticker</code> : Sticker</li>
 *     <li><code>collage</code> :  Collage</li>
 *     <li><code>beauty</code> :  Beauty</li>
 *     <li><code>enhance</code> :  Enhance</li>
 * </ul>
 * @apiParam {String} category_code code of each category
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 * [
 *   {
 *     "id": 1,
 *     "category_code": "print_photo",
 *     "width": 4,
 *     "height": 4,
 *     "type": "square",
 *     "description": "Minimum 12 Photos",
 *     "photo_size_banner": "",
 *     "created_date": "2017-02-07T02:47:06.000Z",
 *     "updated_date": "2017-02-07T02:47:06.000Z"
 *   },
 *   {
 *     "id": 2,
 *     "category_code": "print_photo",
 *     "width": 4,
 *     "height": 6,
 *     "type": "rectangle",
 *     "description": "Minimum 12 Photos",
 *     "photo_size_banner": "",
 *     "created_date": "2017-02-07T02:47:06.000Z",
 *     "updated_date": "2017-02-07T02:47:06.000Z"
 *   }
 * ]
 */
