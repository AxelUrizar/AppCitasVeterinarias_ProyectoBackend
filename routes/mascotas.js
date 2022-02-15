const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const {Mascota, Cita, Veterinario} = require('../models');

// Mostrar mascotas
router.get('/', async (req, res) => {
    const mostrarMascotas = await Mascota.findAll();
    res.json(mostrarMascotas);
})

// Mostrar mascotas de un usuario
router.get('/usuario', auth, async (req, res) => {
    try {
        const mostrarMascotas = await Mascota.findAll({
            where: {
                usuarioId: req.usuario.id
            },
            include: {
                model: Cita,
                include: {
                    model: Veterinario,
                    as: 'veterinario',
                    attributes: [
                        'nombre', 'especialidad'
                    ]
                },
                attributes:[
                    'descripcion', 'fechaCita'
                ]
            },
            attributes: [
                'nombre', 'especie', 'sexo'
            ]
        })
        res.json(mostrarMascotas)
    } catch (error) {
        res.json(error)
    }
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
            [Op.and]: [
                {usuarioId: req.usuario.id},
                {nombre: nombre}
            ]
        }
    })

    res.json('Mascota eliminada.')    
})

module.exports = router;