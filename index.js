require('dotenv').config();
const express = require('express');
const Sequelize = require('sequelize');

const config = require('./config.json');
const db = require('./models')(Sequelize, config);
const { readAll, read } = require('./routes/turtles/readall');
const { create }  = require('./routes/turtles/create');
const { updateTurtle }  = require('./routes/turtles/update');
const { deleteTurtle }  = require('./routes/turtles/delete');
const { readAllWeapons, readWeapon } = require('./routes/weapons/readall');
const { readAllPizzas, readPizza } = require('./routes/pizzas/readall');
const { createWeapon }  = require('./routes/weapons/create');
const { createPizza }  = require('./routes/pizzas/create');
const { updateWeapon }  = require('./routes/weapons/update');
const { updatePizza }  = require('./routes/pizzas/update');
const { deleteWeapon }  = require('./routes/weapons/delete');
const { deletePizza }  = require('./routes/pizzas/delete');

const app = express();
app.use(express.json());

db.sequelize.sync()
    .then(() => {
        console.log('Connection has been established successfully.');

        app.listen(3000, () => {
            console.log('Example app listening on port 3000!');
          });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

app.use('/api/turtles/', readAll);
app.use('/api/turtles/', read);
app.use('/api/turtles/', create);
app.use('/api/turtles/', updateTurtle);
app.use('/api/turtles/', deleteTurtle);
app.use('/api/weapons/', readAllWeapons);
app.use('/api/weapons/', readWeapon);
app.use('/api/weapons/', createWeapon);
app.use('/api/weapons/', updateWeapon);
app.use('/api/weapons/', deleteWeapon);
app.use('/api/pizzas/', readAllPizzas);
app.use('/api/pizzas/', readPizza);
app.use('/api/pizzas/', createPizza);
app.use('/api/pizzas/', updatePizza);
app.use('/api/pizzas/', deletePizza);