const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const contrUsuarios = require('../controllers/contrUsuarios')

// Ver usuarios (con mascotas)
router.get('/', contrUsuarios.mostrarUsuarios)

// Ver perfil
router.get('/perfil', auth, contrUsuarios.perfilUsuario)

// Crear Usuario
router.post('/registrarse', contrUsuarios.nuevoUsuario);

// Eliminar Usuario
router.delete('/eliminar', auth, contrUsuarios.eliminarUsuario)

// Login usuario
router.post('/login', contrUsuarios.login)

// Logout usuario
router.delete('/logout', auth, contrUsuarios.logout)

module.exports = router;