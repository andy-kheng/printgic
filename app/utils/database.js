/* global printgic */

const config = printgic.utils.getConfig('database');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const modelsPath = path.join(__dirname, '../model');
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

fs
    .readdirSync(modelsPath)
    .filter(file => file.indexOf('.') > 0)
    .forEach(file => {
        var model = sequelize.import(path.join(modelsPath, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
