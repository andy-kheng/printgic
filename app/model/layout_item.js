module.exports = (db, DataTypes) => {
    const layout_item = db.define('layout_item', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        layout_id: {
            type: DataTypes.INTEGER
        },
        width: {
            type: DataTypes.DOUBLE
        },
        height: {
            type: DataTypes.DOUBLE
        },
        position: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.STRING
        }
    });
    return layout_item;
};