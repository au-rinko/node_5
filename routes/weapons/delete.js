const Sequelize = require('sequelize');
const express = require('express');
const config = require('../../config.json');
const db = require('../../models')(Sequelize, config);
const { checkInformation } = require('../../check');
const models = require('../../models');

const deleteWeapon = express.Router();

deleteWeapon.delete('/:id', async(req, res) => {
    const { body, params: { id } } = req;

    try {
        const weapon = await db.weapons.destroy({
            where: {
                id: id
            }
        });
        res.status(200);
        res.json(weapon);
    } catch (err) {
        console.log(err);
        res.status(500);
        res.send('Cannot add info to database');
    }
});

module.exports = {
    deleteWeapon
}