const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequelize, config) => {
    const sequelize = new Sequelize(config.database, config.user, process.env.DB_PASSWORD || config.password, {
        host: config.host,
        dialect: config.dialect
    });
    
  
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);
    const turtles = Turtle(Sequelize, sequelize, pizzas); 

    weapons.hasMany(turtles);
    pizzas.hasMany(turtles, {
        foreignKey: 'firstFavoritePizzaId',
        foreignKey: 'secondFavoritePizzaId',
    });

    return {
        turtles,
        weapons,
        pizzas,
    
        sequelize: sequelize,
        Sequelize: Sequelize,
      };
}