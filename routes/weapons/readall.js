const express = require('express');
const Sequelize = require('sequelize');

const config = require('../../config.json');
const db = require('../../models')(Sequelize, config);

const readAllWeapons = express.Router();
const readWeapon = express.Router();

readAllWeapons.get('/', async (req, res) => {
    try {
        const weapon = await db.weapons.findAll();
        res.status(200);
        res.json(weapon);
    } catch (err) {
        res.status(500);
        res.send('Cannot connect to database');
    }
});

readWeapon.get('/:id', async (req, res) => {
    const { params: { id }} = req;
    try {
        const weapon = await db.weapons.findOne({
            where: {
                id: id
            }
        });
        res.status(200);
        res.json(weapon);
    } catch (err) {
        res.status(404);
        res.send(err);
    }
});

module.exports = {
    readAllWeapons,
    readWeapon
}