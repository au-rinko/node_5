const express = require('express');
const Sequelize = require('sequelize');

const config = require('../../config.json');
const db = require('../../models')(Sequelize, config);

const readAllPizzas = express.Router();
const readPizza = express.Router();

readAllPizzas.get('/', async (req, res) => {
    try {
        const pizza = await db.pizzas.findAll();
        res.status(200);
        res.json(pizza);
    } catch (err) {
        res.status(500);
        res.send('Cannot connect to database');
    }
});

readPizza.get('/:id', async (req, res) => {
    const { params: { id }} = req;
    try {
        const pizza = await db.pizzas.findOne({
            where: {
                id: id
            }
        });
        res.status(200);
        res.json(pizza);
    } catch (err) {
        res.status(404);
        res.send(err);
    }
});

module.exports = {
    readAllPizzas,
    readPizza
}