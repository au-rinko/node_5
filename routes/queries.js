const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');

const config = require('../config.json');
const db = require('../models')(Sequelize, config);

const showMozzarella = express.Router();
const favoritePizzas = express.Router();
const createTurtle = express.Router();
const updateFat = express.Router();
const showWeapons = express.Router();
const addFavoritePizzas = express.Router();

showMozzarella.get('/', async (req, res) => {

    try {

        const pizza = await db.pizzas.findOne({
            where: {
                name: {
                    [Op.startsWith]: 'Mozzarella'
                }
            }
        });

        const pizzaId = pizza.dataValues.id;

        const turtle = await db.turtles.findAll({
            order: [['id', 'ASC']],  
            where: {
                [Op.or]: [ { firstFavoritePizzaId: pizzaId }, { secondFavoritePizzaId: pizzaId }],     
            }
        });

        res.status(200);
        res.json(turtle);
    } catch (err) {
        res.status(500);
        res.send('Cannot connect to database');
    }
});

favoritePizzas.get('/', async (req, res) => {
    try {
        const pizza = await db.sequelize.query('SELECT distinct pizzas.id, pizzas.name as "Favorite pizza", pizzas.description FROM pizzas INNER JOIN turtles ON pizzas.id = turtles."firstFavoritePizzaId" or pizzas.id = turtles."secondFavoritePizzaId" ', {
            type: QueryTypes.SELECT
        });
        
        res.status(200);
        res.json(pizza);
    } catch (err) {
        res.status(404);
        res.send(err);
    }
});

createTurtle.post('/', async (req, res) => {
    try {
        const newTurtle = await db.turtles.create({ 
            name: 'Iryna',
            color: 'Blue',
            weaponId: 3
        });
        
        res.status(201);
        res.json(newTurtle);
    } catch (err) {
        res.status(404);
        res.send(err);
    }
});

updateFat.put('/', async (req, res) =>  {
    try {
        const pizza = await db.pizzas.findAll({
            where: {
                calories: {
                    [Op.gte]: 3000
                }
            }
        });

        const updatedArray = [];
        pizza.forEach(item => {
            updatedArray.push({
                id: item.dataValues.id,
                description: `${item.dataValues.description}. SUPER FAT!`
            });
        });
        
        for (let item of updatedArray) {
            const data = await db.pizzas.update(item, {
                where: {
                    id: item.id
                }
            });
        }

        res.status(200);
        res.send('Updated');
    } catch (err) {
        res.status(404);
        res.send(err);
    }
});

showWeapons.get('/', async (req, res) =>  {
    try {
        const weapon = await db.weapons.findAll({
            where: {
                dps: {
                    [Op.gte]: 100
                }
            }
        });

        res.status(200);
        res.json(weapon);
    } catch (err) {
        res.status(404);
        res.send(err);
    }
});

addFavoritePizzas.put('/', async (req, res) => {
    const { body } = req;
    try {
        const turtle = await db.turtles.findOne({
            where: {
                id: 5
            }
        });
        
        const turtleObj = turtle.dataValues;
        turtleObj = {
            id: turtleObj.id,
            name: turtleObj.name,
            color: turtleObj.color,
            firstFavoritePizzaId: body.firstFavoritePizzaId,
            secondFavoritePizzaId: body.secondFavoritePizzaId
        };

        const updatedTurtle = await db.turtles.update(turtleObj, {
            where: {
                id: turtleObj.id
            }
        });
        
        res.status(201);
        res.json(updatedTurtle);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send('Cannot add info to database');
    }
});

module.exports = {
    showMozzarella,
    favoritePizzas,
    createTurtle,
    updateFat,
    showWeapons,
    addFavoritePizzas
}