/**
 * @api {POST} /v1/oauth/register Register new account
 * @apiName register_new_account
 * @apiGroup Authentication
 * @apiParam {String} username
 * @apiParam {String} email
 * @apiParam {String} phone_number
 * @apiParam {String} password
 * @apiParamExample {json} Request example
 * {
 *    "email":"khengandy5@gmail.com",
 *    "password":"123456"
 *    "phone_number":"855-70788768"
 *    "username":"andy.kheng"
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "id": 6,
 *   "email": "khengandy5@gmail.com",
 *   "password": "jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=",
 *   "phone_number": "855-70788768",
 *   "username": "andy.kheng",
 *   "refresh_token": "883f8c21b8d743a0990446be557f2600",
 *   "updated_date": "2017-01-30T08:32:24.000Z",
 *   "created_date": "2017-01-30T08:32:24.000Z"
 * }
 */
/**
 * @api {POST} /v1/oauth/signin Signin
 * @apiName signin
 * @apiGroup Authentication
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiParamExample {json} Request example
 * {
 *    "email":"khengandy5@gmail.com",
 *    "password":"123456"
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "email": "khengandy5@gmail.com",
 *   "username": "andy.kheng",
 *   "phone_number": "855-70788768",
 *   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoZW5nYW5keTVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJhbmR5LmtoZW5nIiwicGhvbmVfbnVtYmVyIjoiODU1LTcwNzg4NzY4IiwiaWF0IjoxNDg1NzY5MDY4LCJleHAiOjE0ODU3OTkwNjh9.zs_wyxz_6KO3HWrUTa-w2gfBeUJ2lLvioaXv1nlK3TY",
 *   "refresh_token": "883f8c21b8d743a0990446be557f2600",
 *   "expires_in_sec": 30000
 * }
 */
/**
 * @api {POST} /v1/oauth/social-signin Social Signin
 * @apiName social_signin
 * @apiGroup Authentication
 * @apiParam {String} username name get from social
 * @apiParam {String} email email get from social
 * @apiParam {String} token social token
 * @apiParam {String} secret_key social id
 * @apiParam {String="FBK","GGP", "TWT", "ISG"} social_page_cd socail page_cd        Example: facebook=FBK, Google plus=GGP, Twitter=TWT, Instagram=ISG
 * @apiParam {String="male","female"} sex sex get from social
 * @apiParam {String} image_url social profile url
 * @apiParamExample {json} Request example
 * {
 *    "email":"khengandy5@gmail.com",
 *    "username":"andy.kheng",
 *    "token": "EAAO5lg1wr64BANIRZC2btLIPZCQVSEFJMUyiMKAnqoQRZARnJfZBOpMGyZAekfQ0j27mSxeP4Vw1ZCRTxMSUPecoX5JQ02adBeBcSRCpvFGo3ujszO0fDFAW2sStZAdNJ3AMwQVjFbLTr9nyc3WHmhZCB2ZCvepVzjN8ZD",
 *    "secret_key": "1009989269022550",
 *    "social_page_cd": "FBK",
 *    "sex": "male",
 *    "image_url": "https://graph.facebook.com/v2.5/1009989269022550/picture?width=1920"
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *      "id": 10,
 *      "email": "khengvandy@yahoo.com",
 *      "username": "khengsovandy",
 *      "sex": null,
 *      "phone_number": "855-70788768",
 *      "password": "jZae727K08KaOmKSgOaGzww/XVqGr/PKEgIMkjrcbJI=",
 *      "address": null,
 *      "refresh_token": "d13e577cb1c04e04bf590627f7c345ae",
 *      "image_url": "https://graph.facebook.com/v2.5/1009989269022550/picture?width=1920",
 *      "created_date": "2017-02-07T08:40:16.000Z",
 *      "updated_date": "2017-02-08T03:42:42.000Z",
 *      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoZW5ndmFuZHlAeWFob28uY29tIiwidXNlcm5hbWUiOiJraGVuZ3NvdmFuZHkiLCJwaG9uZV9udW1iZXIiOiI4NTUtNzA3ODg3NjgiLCJpYXQiOjE0ODY1MjUzNjIsImV4cCI6MTQ4NzQ1NTM2Mn0.QfTRjVKLqL_B-rrLN6XrAoj1EVKlnQ4Rd-J1bdfjxA4"
 * }
 */
