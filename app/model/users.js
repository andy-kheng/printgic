module.exports = (db, DataTypes) => {
    const user = db.define('user', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        sex: {
            type: DataTypes.STRING
        },
        phone_number: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        auth_token: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        },
        role_id: {
            type: DataTypes.INTEGER
        },
        last_login: {
            type: DataTypes.DATE
        },
        hash: {
            type: DataTypes.STRING
        },
        refresh_token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        expires_in_sec: {
            type: DataTypes.INTEGER
        },
        image_url:{
            type: DataTypes.STRING
        }
    });
    return user;
};
