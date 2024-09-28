const express = require('express');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const config = require('../../config.json');
const db = require('../../models')(Sequelize, config);

const readAll = express.Router();
const read = express.Router();

readAll.get('/', async (req, res) => {

    try {
        const turtle = await db.turtles.findAll({
            order: [['id', 'ASC']]
        });
        res.status(200);
        res.json(turtle);
    } catch (err) {
        res.status(500);
        res.send('Cannot connect to database');
    }
});

read.get('/:id', async (req, res) => {
    const { params: { id }} = req;
    try {
        const turtle = await db.turtles.findOne({
            where: {
                id: id
            }
        });

        res.status(200);
        res.json(turtle);
    } catch (err) {
        res.status(404);
        res.send(err);
    }
});

module.exports = {
    readAll,
    read
}