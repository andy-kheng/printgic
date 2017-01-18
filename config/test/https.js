const fs = require('fs');

module.exports = {
    key: fs.readFileSync(printgic.app.path + '/storage/certificates/server.key'),
    cert: fs.readFileSync(printgic.app.path + '/storage/certificates/server.crt'),
    ca: fs.readFileSync(printgic.app.path + '/storage/certificates/ca.crt'),
    passphrase: 'printgic@server',
    requestCert: true,
    rejectUnauthorized: false
};
