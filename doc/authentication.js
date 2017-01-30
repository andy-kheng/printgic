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