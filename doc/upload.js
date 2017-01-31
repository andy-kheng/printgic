/**
 * @api {POST} /upload/image Upload Image
 * @apiName upload-image
 * @apiGroup Upload
 * @apiParam {String} file file image location.
 * @apiParam {Double} width image width.
 * @apiParam {Double} height image height.
 * @apiParam {Double} position_x image position (x).
 * @apiParam {Double} position_y image position (y).
 * @apiParamExample {json} Request example
 * {
 *  "width": 2480,
 *  "height": 3508,
 *  "position_x": 50,
 *  "position_y": 50,
 *  "file": "file Location."
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "image_path": "localhost:3000/uploads/1485271384198-image1.jpg"
 * }
 */
/**
 * @api {POST} /upload Upload Image with Resize
 * @apiName upload-image-with-resize
 * @apiGroup Upload
 * @apiParam {Double} width width of image to resize (px).
 * @apiParam {Double} height height of image to resize (px).
 * @apiParam {String} file file image location.
 * @apiParamExample {json} Request example
 * {
 *  "width": 2480,
 *  "height": 3508,
 *  "file": "file Location."
 * }
 * @apiSuccessExample {json} Success response:
 * {
 *   "original_path": "localhost:3000/uploads/1485277453360-image1.jpg",
 *   "scaled_path": "localhost:3000/uploads/scaled-1485277453360-image1.jpg"
 * }
 */