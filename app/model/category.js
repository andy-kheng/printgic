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
        banner_filename:{
            type: DataTypes.STRING
        }
    });
    return category;
};
