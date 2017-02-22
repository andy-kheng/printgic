/**
 * @api {POST} /v1/recover/password 1.reset password
 * @apiName reset-password
 * @apiGroup Reset password
 * @apiParam {String} email email account that you want to reset password
 * @apiParamExample {json} Request example
 * {
 *      "email": "khengandy@gmail.com"
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "message": "Please login to your email to get recovery code."
 * }
 */
/**
 * @api {GET} /v1/recover/verify-code/:recovery_code 2.check recovery code
 * @apiName check-recovery-code
 * @apiGroup Reset password
 * @apiParam {String} recovery_code recovery code that get from your email
 * @apiParamExample {json} Request example
 * {
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "message": "OK"
 * }
 */
/**
 * @api {PUT} /v1/recover/set-new-password 3.set new password
 * @apiName set-new-password
 * @apiGroup Reset password
 * @apiParam {String} password new password
 * @apiParam {String} recovery_code recovery code that get from your email
 * @apiParamExample {json} Request example
 * {
 *    "password": "123456",
 *    "recovery_code": "g9uZokoN"
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "message": "Set new password succesfully"
 * }
 */
