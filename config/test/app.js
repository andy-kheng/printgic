module.exports = {
    host: 'https://127.0.0.1',
    port: process.env.PORT || 4000,
    secret: 'printgic-secret',
    payment_credentials: {
        acleda: {
            url: 'https://epaymentuat.acledabank.com.kh/PATHMAZING/XPAYConnectorServiceInterfaceImpl?wsdl',
            loginId: 'remoteuser',
            password: 'remotepassword',
            merchantId: 'EnRKL8zXkSnMpLuHhdRewhmJ4qg=',
            signature: '1bd12ec92'
        },
        paygo: {
            url: 'https://apitest.paygo24.com/json/create_transaction',
            urlCheck: 'https://apitest.paygo24.com/json/check_transaction',
            login: 'fn_test',
            password: 'Nsi2PsP9sxzP_qK'
        }
    },
    storage: {}
};
