module.exports = (db, DataTypes) => {
    const photo_size = db.define('photo_size', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        category_code: {
            type: DataTypes.STRING
        },
        width:{
            type: DataTypes.DOUBLE
        },
        height:{
            type: DataTypes.DOUBLE
        },
        type:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.STRING
        },
        photo_size_banner:{
            type: DataTypes.STRING
        }
    });
    return photo_size;
};
