/* global printgic */

const utils = printgic.utils;

module.exports = data => utils.hash(data, { algorithms: 'sha1', encoding: 'base64' });
