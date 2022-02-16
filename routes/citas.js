const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const contrCitas = require('../controllers/contrCitas')


// Ver citas
router.get('/', contrCitas.mostrarCitas)

// Ver cita usuario
router.get('/usuario', auth, contrCitas.citasUsuario)

// Crear cita
router.post('/nuevaCita', auth, contrCitas.nuevaCita)

// Borrar cita
router.delete('/eliminar/:id', auth, contrCitas.borrarCita)

// Modificar cita
router.put('/modificar', auth, contrCitas.modificarCita)

module.exports = router