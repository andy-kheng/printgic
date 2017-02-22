/**
 * @api {GET} /profile/me Get owner profile
 * @apiName get-owner-profile
 * @apiGroup User Profile
 * @apiUse authenticatedHeaders
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "id": 10,
 *   "email": "khengvandy@yahoo.com",
 *   "username": "khengsovandy",
 *   "sex": null,
 *   "phone_number": "855-70788768",
 *   "password": "jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=",
 *   "address": null,
 *   "refresh_token": "d13e577cb1c04e04bf590627f7c345ae",
 *   "image_url": "https://graph.facebook.com/v2.5/1009989269022550/picture?width=1920",
 *   "created_date": "2017-02-07T08:40:16.000Z",
 *   "updated_date": "2017-02-21T08:47:59.000Z"
 * }
 */
/**
 * @api {GET} /profile/:user_id Get profile
 * @apiName get-profile
 * @apiGroup User Profile
 * @apiParam {Integer} user_id id of user you want to see profile
 * @apiUse authenticatedHeaders
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "id": 10,
 *   "email": "khengvandy@yahoo.com",
 *   "username": "khengsovandy",
 *   "sex": null,
 *   "phone_number": "855-70788768",
 *   "password": "jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=",
 *   "address": null,
 *   "refresh_token": "d13e577cb1c04e04bf590627f7c345ae",
 *   "image_url": "https://graph.facebook.com/v2.5/1009989269022550/picture?width=1920",
 *   "created_date": "2017-02-07T08:40:16.000Z",
 *   "updated_date": "2017-02-21T08:47:59.000Z"
 * }
 */
