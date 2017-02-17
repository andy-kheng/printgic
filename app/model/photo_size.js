module.exports = (db, DataTypes) => {
    const photo_size = db.define('photo_size', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        width:{
            type: DataTypes.STRING
        },
        height:{
            type: DataTypes.STRING
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
