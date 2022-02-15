const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth')
const {Mascota} = require('../models');

// Mostrar mascotas
router.get('/', async (req, res) => {
    const mostrarMascotas = await Mascota.findAll();
    res.json(mostrarMascotas);
})

// Mostrar mascotas de un usuario
router.get('/usuario', auth, async (req, res) => {
    const mostrarMascotas = await Mascota.findAll({
        where: {
            usuarioId: req.usuario.id
        },
        attributes: [
            'nombre', 'especie', 'sexo'
        ]
    })
    res.json(mostrarMascotas)
})

// Añadir nueva mascota
router.post('/nuevaMascota', auth, async (req, res) => {
    const { nombre, especie, sexo } = req.body;
    const nuevaMascota = await Mascota.create({nombre: nombre, especie:especie, sexo:sexo, usuarioId:req.usuario.id});

    res.json(nuevaMascota);    
})

// Borrar mascota
router.delete('/borrarMascota', auth, async (req, res) => {
    const {nombre} = req.body;

    const borrarMascota = await Mascota.destroy({
        where: {
            usuarioId: req.usuario.id,
            nombre: nombre
        }
    })

    res.json('Mascota eliminada.')    
})

module.exports = router;