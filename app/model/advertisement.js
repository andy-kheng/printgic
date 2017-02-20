module.exports = (db, DataTypes) => {
    const advertisement = db.define('advertisement', {
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
        start_date: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        end_date:{
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        logo:{
            type: DataTypes.STRING
        },
        banner:{
            type: DataTypes.STRING
        }
    });
    return advertisement;
};
