require('dotenv').config();
const express = require('express');
const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);

const app = express();
app.use(express.json());

db.sequelize.sync({ force: true })
    .then(() => {
        console.log('Connection has been established successfully.');

        app.listen(3000, () => {
            console.log('Example app listening on port 3000!');
          });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });