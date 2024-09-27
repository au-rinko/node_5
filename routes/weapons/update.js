const Sequelize = require('sequelize');
const express = require('express');
const config = require('../../config.json');
const db = require('../../models')(Sequelize, config);
const { checkInformation } = require('../../check');
const models = require('../../models');

const updateWeapon = express.Router();

updateWeapon.put('/:id', async(req, res) => {
    const { body, params: { id } } = req;

    if (!body.name && !body.dps) {
        res.status(400);
        res.send('Not enough information');
    }

    try {
        const weapon = await db.weapons.update(body, {
            where: {
                id: id
            }
        });
        res.status(201);
        res.json(weapon);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send('Cannot add info to database');
    }
});

module.exports = {
    updateWeapon
}