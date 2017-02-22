/* global printgic */
const debug = require('debug');
const db = printgic.database;
const { user: User, user_social: UserSocial } = db;
const urlImage = 'http://192.168.17.89:4000/';
module.exports = {
    * myProfile() {
        let log = debug('printgic:controller:profile:myprofile');
        const userId =  this.auth.id;
        let user = yield User.find({
            attributes: {
                exclude: ['auth_token', 'status', 'role_id', 'last_login', 'hash','expires_in_sec']
            },
            where: {
                id: userId
            }
        });
        if(!user){
            this.bad({message: 'user not exist.'});
            return;
        }

        const userSocial = yield UserSocial.find({
            where: {
                user_id : userId
            }
        });
        if(userSocial){
            user.user_social = userSocial;
        }

        this.ok(user);

    },

    * getProfile() {
        let log = debug('printgic:controller:profile:getProfile');
        // const authId =  this.auth.id;
        const userId = this.params.user_id;
        const user = yield User.find({
            attributes: {
                exclude: ['auth_token', 'status', 'role_id', 'last_login', 'hash','expires_in_sec', 'password', 'refresh_token']
            },
            where: {
                id: userId
            }
        });
        if(!user){
            this.bad({message: 'user not exist.'});
            return;
        }

        this.ok(user);
    }
};
