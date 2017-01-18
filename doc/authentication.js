/**
 * @api {POST} /v1/oauth/access-token Authenticate
 * @apiName auth-authenticate
 * @apiGroup Authentication
 * @apiHeader {String} Authentication The API consumer credentials. <br>
 * The authentication header is a <b>hash</b> with a combination of <code>client_id:client_secret</code>
 *  using <b style="color: brown">SHA1</b> algorithm with encoding <b style="color: purple">base64</b>
 * @apiHeader {String} [Accept-Language] The language expecting from the server.
 * @apiHeader {String} [Time-Zone] The time zone of the API consumer.
 * @apiParam {String} client_id The Client ID.
 * @apiParam {String} permission The request permission.
 * @apiHeaderExample {json} Header example:
 * {
 *     "Authentication": "<< SHA1 BASE64 >>",
 *     "Content-Type": "application/json",
 *     "Accept-Language": "en",
 *     "Time-Zone": "Asia/Phnom_Penh"
 * }
 * @apiParamExample {json} Request example
 * {
 *     "client_id": "SybSeiVJg",
 *     "permission": "client_credentials"
 * }
 * @apiSuccessExample {json} Success response:
 * {
 * "uid": "18ad185d52b0428e972d47a906e41bc2",
 * "legal_name": "Tesjor",
 * "logo_file_name": null,
 * "street_address": null,
 * "city_id": null,
 * "email": null,
 * "phone_number": "+855 12000000",
 * "website": null,
 * "client_id": "SybSeiVJg",
 * "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxOGFkMTg1ZDUyYjA0MjhlOTcyZDQ3YTkwNmU0MWJjMiIsImxlZ2FsX25hbWUiOiJUZXNqb3IiLCJsb2dvX2ZpbGVfbmFtZSI6bnVsbCwic3RyZWV0X2FkZHJlc3MiOm51bGwsImNpdHlfaWQiOm51bGwsImVtYWlsIjpudWxsLCJwaG9uZV9udW1iZXIiOiIrODU1IDEyMDAwMDAwIiwid2Vic2l0ZSI6bnVsbCwiY2xpZW50X2lkIjoiU* 3liU2VpVkpnIiwiaWF0IjoxNDc2ODg3MzM2LCJleHAiOjE0NzY4ODkxMzZ9.lWw64kWol9zkHPC-NuIxxP0dAyT3dxTT4oaPQ5vypHs",
 *  "refresh_token": "MzgwNzAyNGEzMWFmNDBjZjgzMTcxODliZTU2MjFlMTQ6NjYwN2E0NzE5NWNkMTFlNmFmZGQ0M2Y3ZDQzOTkyMTQ=",
 *  "expires_in_sec": 1800
 * }
 */
