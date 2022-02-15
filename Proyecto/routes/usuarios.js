const express = require("express");
const res = require("express/lib/response");
const sequelize = require("sequelize");
const router = express.Router();
const {Usuario, Mascota} = require('../models');

// CREATE
router.post('/', async (req, res, next) => {
    const {nombre, email, contrasenya, direccion} = req.body;

    const userExists = await Usuario.findOne({ email: email});
    if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'}); }

    const user = await Usuario.create({nombre: nombre, email: email, contrasenya: contrasenya, direccion: direccion});
    res.json(user)
});

// READ
router.get('/', async (req, res, next) => {
    const readUsuarios = await Usuario.findAll({
        include: [{
            model: Mascota
        }]
    })
    res.json(readUsuarios)
})

// UPDATE

// DELETE

module.exports = router;