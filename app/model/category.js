module.exports = (db, DataTypes) => {
    const category = db.define('category', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.STRING
        },
        category_code: {
            type: DataTypes.STRING
        },
        category_banner:{
            type: DataTypes.STRING
        }
    });
    return category;
};
