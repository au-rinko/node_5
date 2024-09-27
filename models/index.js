const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');

module.exports = (Sequilize, config) => {
    

    const turtles = Turtle(Sequelize, sequelize);
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);

    return {
        turtles,
        weapons,
        pizzas,
    
        sequelize: sequelize,
        Sequelize: Sequelize,
      };
}