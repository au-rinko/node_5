const Sequelize = require('sequelize');
const express = require('express');
const config = require('../../config.json');
const db = require('../../models')(Sequelize, config);
const { checkInformation } = require('../../check');

const createPizza = express.Router();

createPizza.post('/', async(req, res) => {
    const { body } = req;

    const message = checkInformation(req);

    if(message) {
        res.status(400);
        res.send(message);
    } else {
        try {
            const pizza = await db.pizzas.create(body);
            res.status(201);
            res.json(pizza);
        } catch (err) {
            console.log(err);
            res.status(500);
            res.send('Cannot add info to database');
        }
    }

});

module.exports = {
    createPizza
}