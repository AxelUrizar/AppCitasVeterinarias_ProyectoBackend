const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth')
const {Usuario, Mascota, Token} = require('../models');

// Crear Usuario
router.post('/', async (req, res, next) => {
    const {nombre, email, contrasenya, direccion} = req.body;

    const userExists = await Usuario.findOne({
        where: { email: email }
    });
    if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'}); }

    const user = await Usuario.create({nombre: nombre, email: email, contrasenya: contrasenya, direccion: direccion});
    res.json(user)
});


// Ver usuarios (con mascotas)
router.get('/', async (req, res, next) => {
    const verUsuarios = await Usuario.findAll({
        include: [{
            model: Mascota
        }]
    })
    res.json(verUsuarios)
})

// Ver perfil
router.get('/perfil', auth, async (req, res, next) => {
    const verUsuario = await Usuario.findOne({
        where: {
            id: req.usuario.id
        },
        include: [{
            model: Mascota
        }]
    })
    res.json(verUsuario)
})

// Eliminar Usuario
router.delete('/', auth, async (req, res) => {
    const borrarUsuario = await Usuario.destroy({
        where: {
            id: req.usuario.id
        }
    })

    res.json('Usuario eliminado.')    
})

// Login usuario
router.post('/login', async (req, res) => {
    const {email, contrasenya} = req.body;

    const usuario = await Usuario.findOne({
        where: {
            email: email,
            contrasenya: contrasenya
        }
    });

    if (!usuario) return res.json({ error: 'Invalid login credentials' })

    const generarToken = jwt.sign({id: usuario.id, nombre: usuario.nombre, email:usuario.email}, process.env.JWT_SECRET)
    const login = await Token.create({token: generarToken, usuarioId: usuario.id});

    res.json('User logged');
})

// Logout usuario
router.delete('/logout', async (req, res) => {
    const {token} = req.body;
    if(token == null) return res.json({error: 'Invalid credentials'});

    const logout = await Token.destroy({
        where: {
            token: token
        }
    })
    res.json('Logout completed')
})

module.exports = router;