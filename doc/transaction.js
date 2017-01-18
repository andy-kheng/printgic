/**
 * @api {POST} /v1/payments/transactions Create transaction
 * @apiName transaction-create
 * @apiGroup Transaction
 * @apiUse authenticatedHeaders
 * @apiParam {Object} customer
 * @apiParam {String} customer.udid Customer Unique Device Identifier.
 * @apiParam {String} customer.ip Customer IP address.
 * @apiParam {String} customer.latitude Customer latitude.
 * @apiParam {String} customer.longitude Customer longitude.
 * @apiParam {String} description A description about the transaction.
 * @apiParam {String} total_amt Total amount.
 * @apiParam {Integer} total_qty Total quantity.
 * @apiParam {String="USD"} currency_code Current Code.
 * @apiParam {Object} items
 * @apiParam {String} items.name Item name.
 * @apiParam {String} items.unit_price Item unit price.
 * @apiParam {Integer} items.qty Item quantity.
 * @apiParam {String="ACD","PNG","WIG"} payment_code Transaction payment code.
 * @apiParam {Object} payment_options
 * @apiParam {String} account_type Account type is required when <b>payment code</b> is <code>ACD</code>.
 * @apiParam {String} account Account is required when <b>payment code</b> is <code>ACD</code> or <code>WIG</code>.
 * @apiParam {String} point_id Point ID is required when <b>payment code</b> is <code>PNG</code>.
 * @apiParam {String} signature A signature is a way to prevent data from being tampered with.<br>
 * A signature is a <b>hash</b> with a combination of <code>client_uid + client_id + client_secret + total_amt + total_qty + ip</code>
 *  using <b style="color: brown">SHA1</b> algorithm with encoding <b style="color: purple">base64</b>
 * @apiParamExample {json} Request example
 * {
 * 	   "customer": {
 * 	   	"udid": "01234567890",
 * 	   	"ip": "127.0.0.1",
 * 	   	"latitude": "10.101",
 * 	   	"longitude": "101.01"
 * 	   },
 *     "description": "Buying Fried Chickens with 2 Eggs and a Bottle of Water.",
 *     "total_amt": "35.94",
 *     "total_qty": 6,
 *     "currency_code": "USD",
 *     "items": [{
 *         "name": "Fried Chickens with 2 Eggs",
 *         "unit_price": "6.79",
 *         "qty": 5
 *     }, {
 *     	"name": "Bottle of Water",
 *     	"unit_price": "1.99",
 *     	"qty": 1
 *     }],
 *     "payment_code": "PNG",
 *     "payment_options": {
 *     	"account_type": "",
 *         "account": "",
 *         "point_id": "516"
 *     },
 *     "signature": "3xmPRt46WqqvacLZWU90wLNUN8c="
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *     "txid": 445,
 *     "state": "created",
 *     "expires_in_sec": 480,
 *     "uid": "d6d3ef26e16147999fb7f884b4f0c4cc",
 *     "customer": {
 *       "udid": "01234567890",
 *       "ip": "127.0.0.1",
 *       "latitude": "10.101",
 *       "longitude": "101.01"
 *     },
 *     "description": "Buying Fried Chickens with 2 Eggs and a Bottle of Water.",
 *     "total_qty": 6,
 *     "total_amt": "35.94",
 *     "currency_code": "USD",
 *     "items": [
 *       {
 *         "unit_price": "6.79",
 *         "qty": 5,
 *         "item_name": "Fried Chickens with 2 Eggs",
 *         "transaction_id": 45
 *       },
 *       {
 *         "unit_price": "1.99",
 *         "qty": 1,
 *         "item_name": "Bottle of Water",
 *         "transaction_id": 45
 *       }
 *     ],
 *     "payment_transaction_id": 1383,
 *     "payment_code": "PNG",
 *     "payment_options": {
 *       "account_type": "",
 *       "account": "",
 *       "point_id": "516"
 *     },
 *     "instructions": "A SMS will be sent to you soon with the validation code"
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
