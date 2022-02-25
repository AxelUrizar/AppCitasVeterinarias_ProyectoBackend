const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const contrCitas = require('../controllers/contrCitas')


// Ver citas
router.get('/', contrCitas.mostrarCitas)

// Ver cita usuario
router.get('/usuario', auth, contrCitas.citasUsuario)

// Ver cita mascota
router.get('/mascota/:id', auth, contrCitas.citasMascota)

// Ver cita por Id
router.get('/:idCita', auth, contrCitas.citaId)

// Crear cita
router.post('/nuevaCita/:id', auth, contrCitas.nuevaCita)

// Borrar cita
router.delete('/eliminar/:idCita', auth, contrCitas.borrarCita)

// Modificar cita
router.put('/modificar/:idCita', auth, contrCitas.modificarCita)

module.exports = router