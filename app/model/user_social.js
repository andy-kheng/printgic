module.exports = (db, DataTypes) => {
    const user_social = db.define('user_social', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        social_page_cd:{
            type: DataTypes.STRING
        },
        secret_key:{
            type: DataTypes.STRING
        },
        token:{
            type: DataTypes.STRING
        }
    });
    return user_social;
};
