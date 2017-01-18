module.exports = {
    auth: {
        prefix: '/v1/oauth',
        routes: [{
            before: ['Auth@authorized'],
            handler: 'Auth@create',
            path: '/create',
            method: 'POST'
        }, {
            before: ['Auth@authorized'],
            handler: 'Auth@verify',
            path: '/verify',
            method: 'POST'
        }]
    },
    home: {
        routes: [{
            handler: 'Home@index',
            path: '/',
            method: 'GET'
        }, {
            handler: 'Home@construction',
            path: '/construction',
            method: 'GET'
        }, {
            handler: 'Home@ping',
            path: '/ping',
            method: 'GET'
        }]
    },
    upload: {
        prefix: '/upload',
        routes: [{
            // before: ['Auth@authorized', 'Auth@authenticated'],
            handler: 'Upload@create',
            path: '/',
            method: 'POST'
        }, {
            handler: 'Upload@upload',
            path: '/do',
            method: 'POST'
        }, {
            handler: 'Upload@test',
            path: '/test',
            method: 'POST'
        }]
    }
};