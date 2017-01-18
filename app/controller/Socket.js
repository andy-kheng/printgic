"use strict";
let domain = require('domain');
let co = require('co');
let debug = require("debug")("tesjor:controller:socket");
let Socket = module.exports = {};
function domainRun(socket) {
    var d = domain.create();
    d.on('error', function(er) {
        debug('error', er.stack);
    });
    d.add(socket);
    // Now run the handler function in the domain.
    d.run(function() {
        let handler = new printgic.service.SocketHandler(socket);
        co.wrap(handler.run).call(handler);
    });
}
Socket.printgic = function() {
    domainRun(this);
};
