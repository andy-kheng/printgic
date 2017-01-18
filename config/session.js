'use strict';

module.exports = {
    name: 'printgic.sid',
    store: true,
    secret: 'session-keyboard-cat',
    rolling: false,
    resave: true,
    genid: false,
    proxy: undefined,
    saveUninitialized: false,
    unset: 'keep',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null
    }
};
