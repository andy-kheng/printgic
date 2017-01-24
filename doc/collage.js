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
 *              "image_path": "192.168.17.89:4000/uploads/pic2.png"*
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
 * @api {POST} /v1/payments/transactions/commit Commit transaction
 * @apiName transaction-commit
 * @apiGroup Transaction
 * @apiUse authenticatedHeaders
 * @apiParam {String} txid The transaction ID.
 * @apiParam {String} security_code The validation code of the user.
 * @apiParam {String} signature A signature is a way to prevent data from being tampered with.<br>
 * A signature is a <b>hash</b> with a combination of <code>client_uid + client_id + client_secret + total_amt + total_qty + ip</code>
 *  using <b style="color: brown">SHA1</b> algorithm with encoding <b style="color: purple">base64</b>
 * @apiParamExample {json} Request example
 * {
 * 	   "txid": 445,
 * 	   "signature": "3xmPRt46WqqvacLZWU90wLNUN8c=",
 * 	   "security_code": "23340"
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *     "state": "completed",
 *     "uid": "d6d3ef26e16147999fb7f884b4f0c4cc"
 * }
 */