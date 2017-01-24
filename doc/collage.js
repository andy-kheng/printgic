
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
 * @api {GET} /collage get collage
 * @apiName get-collage
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
 *       "id": 1,
 *       "width": 7457,
 *       "height": 875754,
 *       "position": "7457"
 *     }
 *   ],
 *   "layout_sample": "localhost:3000/uploads/collage.png"
 * }
 */