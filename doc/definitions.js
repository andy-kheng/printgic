/**
 * @apiDefine authorizedHeaders
 * @apiHeader {String} [Accept-Language] The language expecting from the server.
 * @apiHeader {String} [Time-Zone] The time zone of the API consumer.
 * @apiHeaderExample {json} Header example:
 * {
 *     "Content-Type": "application/json",
 *     "Accept-Language": "en",
 *     "Time-Zone": "Asia/Phnom_Penh"
 * }
 */
/**
 * @apiDefine authenticatedHeaders
 * @apiHeader {String} X-Auth The access token of the API consumer.
 * @apiHeader {String} [Accept-Language] The language expecting from the server.
 * @apiHeader {String} [Time-Zone] The time zone of the API consumer.
 * @apiHeaderExample {json} Header example:
 * {
 *     "X-Auth": "<< Bearer ACCESS TOKEN >>",
 *     "Content-Type": "application/json",
 *     "Accept-Language": "en",
 *     "Time-Zone": "Asia/Phnom_Penh"
 * }
 */
