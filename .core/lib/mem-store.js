"use strict";

// import namespaces
let utils = printgic.utils;
let memStoreConfig = utils.getConfig("mem-store");
let memStore = require("./mem-store/" + memStoreConfig.driver + ".js");

module.exports = {
    driver: memStore.driver,
    createClient: memStore.createClient(memStoreConfig)
};
