'use strict';

let core = require('./.core');
let app = core({
    root: __dirname
});
if (!app.isMaster) {
    app.run();
}
