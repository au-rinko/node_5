const Sequelize = require('sequelize');
const express = require('express');
const config = require('../../config.json');
const db = require('../../models')(Sequelize, config);
const { checkInformation } = require('../../check');
const models = require('../../models');

const updateTurtle = express.Router();

updateTurtle.put('/:id', async(req, res) => {
    const { body, params: { id } } = req;

    if (!body.name && !body.color && !body.weaponId && !body.firstFavoritePizzaId && !body.secondFavoritePizzaId) {
        res.status(400);
        res.send('Not enough information');
    }

    console.log(body);

    try {
        const turtle = await db.turtles.update(body, {
            where: {
                id: id
            }
        });
        res.status(201);
        res.json(turtle);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send('Cannot add info to database');
    }
});

module.exports = {
    updateTurtle
}