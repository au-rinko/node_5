const Sequelize = require('sequelize');
const express = require('express');
const config = require('../../config.json');
const db = require('../../models')(Sequelize, config);
const { checkInformation } = require('../../check');
const models = require('../../models');

const updatePizza = express.Router();

updatePizza.put('/:id', async(req, res) => {
    const { body, params: { id } } = req;

    if (!body.name && !body.description && !body.calories) {
        res.status(400);
        res.send('Not enough information');
    }

    try {
        const pizza = await db.pizzas.update(body, {
            where: {
                id: id
            }
        });
        res.status(201);
        res.json(pizza);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send('Cannot add info to database');
    }
});

module.exports = {
    updatePizza
}