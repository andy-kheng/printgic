module.exports = (db, DataTypes) => {
    const users = db.define('users', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING
        },
        phonenumber: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        auth_token: {
            type: DataTypes.STRING
        },
        refresh_token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        expires_in_sec: {
            type: DataTypes.INTEGER
        }
    });
    return users;
};
