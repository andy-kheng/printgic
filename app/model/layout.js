module.exports = (db, DataTypes) => {
    const layout = db.define('layout', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        width: {
            type: DataTypes.DOUBLE
        },
        height: {
            type: DataTypes.DOUBLE
        },
        max_photos: {
            type: DataTypes.INTEGER
        },
        background_image: {
            type: DataTypes.STRING
        },
        background_color: {
            type: DataTypes.STRING
        },
        layout_thumbnail: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    });
    return layout;
};
