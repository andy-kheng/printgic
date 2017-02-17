module.exports = {
    auth: {
        prefix: '/v1/oauth',
        routes: [{
            before: ['Auth@authorized'],
            handler: 'Auth@register',
            path: '/register',
            method: 'POST'
        }, {
            before: ['Auth@authorized'],
            handler: 'Auth@signin',
            path: '/signin',
            method: 'POST'
        }, {
            before: ['Auth@authorized'],
            handler: 'Auth@socialSignin',
            path: '/social-signin',
            method: 'POST'
        }, {
            handler: 'Auth@refreshToken',
            path: '/refresh-token',
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
            before: ['Auth@authorized', 'Auth@authenticated'],
            handler: 'Upload@create',
            path: '/',
            method: 'POST'
        }, {
            handler: 'Upload@upload',
            path: '/image',
            method: 'POST'
        }, {
            handler: 'Upload@test',
            path: '/test',
            method: 'POST'
        }, {
            handler: 'Upload@collage',
            path: '/collage',
            method: 'POST'
        }]
    },
    collage: {
        prefix: '/collage',
        routes: [{
            handler: 'Collage@listCollage',
            path: '/',
            method: 'get'
        }, {
            handler: 'Collage@collage',
            path: '/:layout_id',
            method: 'get'
        }, {
            handler: 'Collage@crateCollage',
            path: '/:layout_id',
            method: 'post'
        }]
    },
    category: {
        prefix: '/category',
        routes: [{
            handler: 'Category@listCategory',
            path: '/',
            method: 'get'
        }, {
            handler: 'Category@category_detail',
            path: '/:category_id',
            method: 'get'
        }]
    },
    photo_size: {
        prefix: '/photo-size',
        routes: [{
            handler: 'PhotoSize@listPhotoSizeItem',
            path: '/:photo_size_id',
            method: 'get'
        }]
    }
};
