const express = require('express');

function checkInformation (req, id) {
    let message = null;
    const { body, baseUrl} = req;

    if (baseUrl === '/api/turtles') {
        if (body.name && typeof body.name !== 'string') {
            message = 'Name is required. It should be a string';
        }
        
        if (body.color && typeof body.name !== 'string') {
            message = 'Color is required. It should be a string';
        }
    
        if (body.weaponId && typeof body.weaponId !== 'number') {
            message = 'WeaponId is required. It should be a number';
        }
    
        if (body.firstFavoritePizzaId && typeof body.firstFavoritePizzaId !== 'number') {
            message = 'firstFavoritePizzaId is required. It should be a number';
        }
    
        if (body.secondFavoritePizzaId && typeof body.secondFavoritePizzaId !== 'number') {
            message = 'secondFavoritePizzaId should be a number';
        }
    }

    if (baseUrl === '/api/weapons') {
        if (body.name && typeof body.name !== 'string') {
            message = 'Name is required. It should be a string';
        }
    
        if (body.dps && typeof body.dps !== 'number') {
            message = 'Dps is required. It should be a number';
        }
    
    }

    if (baseUrl === '/api/pizzas') {
        if (body.name && typeof body.name !== 'string') {
            message = 'Name is required. It should be a string';
        }
    
        if (body.description && typeof body.description !== 'string') {
            message = 'Description should be a number';
        }

        if (body.calories && typeof body.calories !== 'number') {
            message = 'Calories is required. It should be a number';
        }
    }

    return message;
}

module.exports = {
    checkInformation
}