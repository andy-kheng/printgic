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
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 * [
 *  {
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
 *   ],
 *   "layout_sample": "localhost:3000/uploads/collage.png"
 *  },
 *  {
 *     "id": 2,
 *     "width": 2480,
 *     "height": 3508,
 *     "background_image": "192.168.17.89:3000/uploads/A4.jpg",
 *     "background_color": "",
 *     "layout_item": [
 *       {
 *         "id": 3,
 *         "width": 1140,
 *         "height": 3408,
 *         "position": "50-50|1230-50"
 *       },
 *       {
 *         "id": 4,
 *         "width": 1140,
 *         "height": 3408,
 *         "position": "1290-50|2475-50"
 *       }
 *     ]
 *  }
 * ]
 */