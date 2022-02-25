const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const contrMascotas = require('../controllers/contrMascotas')

// Mostrar mascotas
router.get('/', contrMascotas.mostrarTodo) 

// Mostrar mascotas de un usuario
router.get('/usuario', auth, contrMascotas.mostrarUsuario)

// Buscar mascota por Id
router.get('/:id', contrMascotas.buscarMascotaId)
    
// Añadir nueva mascota
router.post('/nuevaMascota', auth, contrMascotas.nuevaMascota)

// Borrar mascota
router.delete('/borrarMascota', auth, contrMascotas.borrarMascota)

module.exports = router;