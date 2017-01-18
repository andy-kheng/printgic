'use strict';

let debug = require('debug')('printgic:core:response');

let response = {
    ok: function(req, res, content, message) {
        if (!res.headersSent) {
            content = content || { message: "OK" };
            res.append("X-Message", message || content.message || "OK");
            res.status(200).json(content);
        }
    },
    bad: function(req, res, content, message) {
        if (!res.headersSent) {
            content = content || { message: "Bad Request" };
            res.append("X-Message", message || content.message || "Bad request");
            res.status(400).json(content);
            debug('bad-request', content);
        }
    },
    fail: function(req, res, content, message) {
        if (!res.headersSent) {
            content = content || { message: "Unprocessable Entity" };
            res.append("X-Message", message || content.message || "Unprocessable Entity");
            res.status(422).json(content);
            debug('fail-request', content);
        }
    },
    notFound: function(req, res, content, message) {
        if (!res.headersSent) {
            content = content || { message: "Not found" };
            res.append("X-Message", message || content.message || "Not found");
            res.status(404).json(content);
            debug('fail-request', content);
        }
    },
    error: function(req, res, err, message) {
        let code = 500;
        debug("ERROR: ", err ? err.stack : err);
        if (err && (err.constructor.name === "AssertionError")) code = 400;
        res.append("X-Message", message || err.message);
        if (!res.headersSent) {
            // let output = savada.app.environment === "production" ? err.message : err.stack;
            let output = err.stack;
            if (req.get("X-APP") !== "mobile") {
                res.status(code).json(output.replace(/(?:\r\n|\r|\n)/g, "<br />"));
            } else {
                res.status(code).json(output);
            }
        }
    }
};

module.exports = function(req, res) {
    res.ok = function(content, message) {
        return response.ok(req, res, content, message);
    };
    res.bad = function(content, message) {
        return response.bad(req, res, content, message);
    };
    res.fail = function(content, message) {
        return response.fail(req, res, content, message);
    };
    res.notFound = function(content, message) {
        return response.notFound(req, res, content, message);
    };
    res.error = function(content, message) {
        return response.error(req, res, content, message);
    };
};
