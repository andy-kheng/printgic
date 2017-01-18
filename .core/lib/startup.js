"use strict";

let cluster = require("cluster");
let numCpus = require("os").cpus().length;

if (cluster.isMaster) {
    let masterFork = require("./cluster/master.js");
    masterFork({
        numCpus: numCpus
    });
} else {
    let workerFork = require("./cluster/worker.js");
    workerFork();
}
