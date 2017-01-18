"use strict";

// import namespaces
let utils = printgic.utils;
let db = printgic.db;
module.exports = modelLoader();

function modelLoader() {
    return utils.loadClasses({
        loaderPath: "model",
        parser: function(name, identifier) {
            let model = identifier.call(printgic.sequelize, db, printgic.sequelize);
            return model;
        }
    });
}
