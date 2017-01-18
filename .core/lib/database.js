"use strict";

// import namespaces
let utils = printgic.utils;
let app = printgic.app;
let Sequelize = printgic.sequelize;

global.Sequelize = require("sequelize");
let databaseConfig = utils.getConfig("database");
let dbLog = require("debug")("printgic:db");

if (app.config.debug && databaseConfig.logging) {
    databaseConfig.logging = dbLog;
}

let db = new Sequelize(
    databaseConfig.database,
    databaseConfig.username,
    databaseConfig.password,
    databaseConfig
);

module.exports = db;
