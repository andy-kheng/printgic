process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const path = require('path');
const app = require('../.core/index')({
    root: path.resolve(__dirname, '../'),
    env: 'test'
});
const { host, port } = app.config;

app.run();

const baseUrl = host + ':' + port;
const request = require('supertest-as-promised')(baseUrl);
const { expect } = require('chai');

module.exports = { baseUrl, expect, request };
