"use strict";
let cluster = require("cluster");
let debug = require("debug")("printgic:cluster:master");

module.exports = master;

process.title = 'PrintGic - Master Fork';

function onOnline(worker) {
    debug(`Worker #${worker.process.pid} is now online`);
}

function onListening(worker) {
    debug(`Worker #${worker.process.pid} is now connected to ${worker.address}:${worker.port}`);
}

function onExit(worker, code, signal) {
    let oldLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 50;
    let errorStack = new Error().stack;
    debug('worker %d died (%s). restarting...', worker.process.pid);
    if (signal) {
        debug("worker was killed by signal: " + signal);
    } else if (code !== 0) {
        debug("worker exited with error code: " + code);
    } else {
        debug("worker success!");
    }
    cluster.fork();
    let fs = require('fs');
    let logData = [];
    logData.push('Date   : ' + (new Date()).toUTCString());
    logData.push('Code   : ' + code);
    logData.push('Signal : ' + signal);
    logData.push('Process: ' + worker.process.pid);
    logData.push('Stack  : ' + errorStack);
    logData.push('********************************************************************\n\n\n');
    fs.appendFile(printgic.app.root + '/var/log/crash.log', logData.join('\n'));
    Error.stackTraceLimit = oldLimit;
}

function bindEvents() {
    cluster.on("online", onOnline);
    cluster.on("listening", onListening);
    cluster.on("exit", onExit);
}

function master(options) {
    bindEvents();
    // Start workers and listen for messages containing notifyRequest
    let numCPUs = (process.env === 'production') ? options.numCpus : 1;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

}
