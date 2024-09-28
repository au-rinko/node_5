const { DataTypes } = require("sequelize");

module.exports = (Sequelize, sequelize, pizzas) => {
    return sequelize.define('turtles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        weaponId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        firstFavoritePizzaId: {
            type: Sequelize.INTEGER,
            preferences: {
                model: pizzas,
                key: 'id'
            }
        },
        secondFavoritePizzaId: {
            type: Sequelize.INTEGER,
            preferences: {
                model: pizzas,
                key: 'id'
            }
        }
    });
}