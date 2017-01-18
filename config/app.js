module.exports = {
    name: 'printgic',
    port: process.env.NODE_PORT || 5000,
    debug: true,
    showXPower: false, // show x-powered on HTTP header
    host: 'http://apidev.printgic.com/',
    cluster: false,
    memStore: true,
    http: {
        route: 'route.http.js',
        secure: false
    },
    socket: {
        enable: true,
        route: 'route.socket.js',
        secure: false
    },
    view: {
        enable: true,
        cache: false // this option should be enable on production mode
    },
    directive: {
        public: 'public',
        controller: 'controller',
        filter: 'filter',
        model: 'model',
        logger: 'var/app.log',
        lib: 'lib'
    },
    express: {
        'trust proxy': ['linklocal', 'uniquelocal'],
        'query parser': 'extended',
        'strict routing': false,
        'case sensitive routing': false,
        'etag': true
    },
    upload: {
        dest: '',
        limits: {
            fieldNameSize: '100b',
            fieldSize: '',
            fields: '10',
            fileSize: '50MB',
            files: '5',
            parts: '10',
            headerPairs: 50
        }
    },
    storage: {

    }
};