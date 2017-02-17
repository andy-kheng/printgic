module.exports = (db, DataTypes) => {
    const photo_size_item = db.define('photo_size_item', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        photo_size_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        price:{
            type: DataTypes.STRING
        },
        total_photo:{
            type: DataTypes.STRING
        }
    });
    return photo_size_item;
};
