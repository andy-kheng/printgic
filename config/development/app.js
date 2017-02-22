module.exports = {
    host: 'https://127.0.0.1',
    port: process.env.PORT || 3000,
    secret: 'Web-service',
    storage: {},
    smtpConfig: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'andy.kheng@pathmazing.com',
            pass: '089772872'
        }
    }
};
