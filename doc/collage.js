/**
 * @api {POST} /collage/:layout_id Create collage
 * @apiName create-collage
 * @apiGroup Collage
 * @apiParam {Object} layout_items
 * @apiParam {Integer} layout_items.layout_item_id layout item id.
 * @apiParam {String} layout_items.image_path Image path of item.
 * @apiParamExample {json} Request example
 * {
 *    "layout_items": [
 *          {
 *              "layout_item_id": 1,
 *              "image_path": "192.168.17.89:4000/uploads/pic2.png"
 *          },
 *          {
 *              "layout_item_id": 2,
 *              "image_path": "192.168.17.89:4000/uploads/pic3.png"
 *          }
 *    ]
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *     "image_path": "192.168.17.89:4000/uploads/collage_test.png"
 * }
 */
/**
 * @api {GET} /collage/:layout_id Get collage detail
 * @apiName get-collage-detail
 * @apiGroup Collage
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "id": 1,
 *   "width": 2480,
 *   "height": 3508,
 *   "background_image": null,
 *   "background_color": "#ffffff",
 *   "layout_item": [
 *     {
 *      "id": 1,
 *      "width": "1140",
 *      "height": "3408",
 *      "position": "50-50|1230-50"
 *    },
 *    {
 *      "id": 2,
 *      "width": "1140",
 *      "height": "3408",
 *      "position": "1290-50|2475-50"
 *    }
 *   ]
 * }
 */
/**
 * @api {GET} /collage Get collage List
 * @apiName get-collage-list
 * @apiGroup Collage
 * @apiDescription <code>Query Example</code>:  http://127.0.0.1:3000/collage?max_photos=2&photo_size_id=3 <br>
 * @apiParam {String} [max_photos] total of max photo in collage
 * @apiParam {String} [photo_size_id] photo size id
 * @apiParam {Integer} [limit] Set the limit for the response.
 * @apiParam {Integer} [offset] Set the offset for the response.
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 * [
 *   {
 *     "id": 1,
 *     "width": 2480,
 *     "height": 3508,
 *     "max_photos": 2,
 *     "background_image": "",
 *     "background_color": "#03A9F4",
 *     "layout_thumbnail": null
 *   },
 *   {
 *     "id": 2,
 *     "width": 2480,
 *     "height": 3508,
 *     "max_photos": 2,
 *     "background_image": "127.0.0.1:3000/uploads/A4.jpg",
 *     "background_color": "",
 *     "layout_thumbnail": null
 *   },
 *   {
 *     "id": 3,
 *     "width": 9933,
 *     "height": 14043,
 *     "max_photos": 10,
 *     "background_image": null,
 *     "background_color": "#03A9F4",
 *     "layout_thumbnail": null
 *   }
 * ]
 */
