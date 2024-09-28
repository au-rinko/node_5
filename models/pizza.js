module.exports = (Sequelize, sequelize) => {
    return sequelize.define('pizzas', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
        },
        calories: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        }
    });
}