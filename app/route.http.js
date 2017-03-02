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
            handler: 'Auth@verifyEmail',
            path: '/verify-email',
            method: 'get'
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
    profile: {
        prefix: '/profile',
        routes: [{
            before: ['Auth@authorized', 'Auth@authenticated'],
            handler: 'Profile@myProfile',
            path: '/me',
            method: 'GET'
        },
        {
            before: ['Auth@authorized', 'Auth@authenticated'],
            handler: 'Profile@getProfile',
            path: '/:user_id',
            method: 'GET'
        }]
    },
    upload: {
        prefix: '/upload',
        routes: [{
            before: ['Auth@authorized', 'Auth@authenticated'],
            handler: 'Upload@uplaodAndResize',
            path: '/',
            method: 'POST'
        }, {
            handler: 'Upload@uploadAndCrop',
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
        prefix: '/photo_size',
        routes: [{
            handler: 'PhotoSize@listPhotoSizeItem',
            path: '/:photo_size_id',
            method: 'get'
        },{
            handler: 'PhotoSize@listPhotoSizeByCategory',
            path: '/list-by-category-code/:category_code',
            method: 'get'
        }]
    },
    recover: {
        prefix: '/v1/recover',
        routes: [{
            handler: 'Recover@recoverPassword',
            path: '/password',
            method: 'Post'
        },{
            handler: 'Recover@getRecoverCode',
            path: '/verify-code/:recovery_code',
            method: 'get'
        },{
            handler: 'Recover@setNewPassword',
            path: '/set-new-password',
            method: 'put'
        }]
    }
};
