const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const {Mascota, Veterinario, Cita} = require('../models');

// Ver citas
router.get('/', async (req, res) => {
    const verCitas = await Cita.findAll();
    res.json(verCitas);
})

// Crear cita
router.post('/', auth, async (req, res) => {
    try {
        const { descripcion, mascotaId, veterinarioId } = req.body;

        const mascotaConf = await Mascota.findOne({
            where: {
                usuarioId: req.usuario.id,
                id: mascotaId                
            }
        })

        const veterinarioConf = await Veterinario.findOne({
            where: {
                id: veterinarioId
            }
        })

        const fecha = new Date()
        const fechaCitaCalc = fecha.toLocaleDateString(fecha.setDate(fecha.getDate() + 7))

        const nuevaCita = await Cita.create({ descripcion: descripcion, mascotaId: mascotaConf.id, veterinarioId: veterinarioConf.id, fechaCita: fechaCitaCalc })

        res.json(nuevaCita)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router