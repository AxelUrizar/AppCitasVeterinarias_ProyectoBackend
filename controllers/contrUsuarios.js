const jwt = require('jsonwebtoken');
const {Usuario, Mascota, Token, Cita, Veterinario} = require('../models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.mostrarUsuarios = async (req, res, next) => {
    const verUsuarios = await Usuario.findAll({
        include: [{
            model: Mascota
        }]
    })
    res.json(verUsuarios)
}

exports.perfilUsuario = async (req, res, next) => {
    try {
        const verUsuario = await Usuario.findOne({
            where: {
                id: req.usuario.id
            },
            include: [{
                model: Mascota,
                include: [{
                    model: Cita,
                    include: [{
                        model: Veterinario,
                        as: 'veterinario',
                        attributes: [
                            'nombre', 'especialidad'
                        ]
                    }],
                    attributes:[
                        'descripcion', 'fechaCita'
                    ]
                }],
                attributes: [
                    'nombre', 'especie', 'sexo'
                ]
            }],
            attributes: [
                'nombre', 'email', 'direccion'
            ]
        })
        
        res.json(verUsuario)
        
    } catch (error) {
        res.json(error)
    }
}

exports.nuevoUsuario = async (req, res, next) => {
    const {nombre, email, contrasenya, direccion} = req.body;

    const userExists = await Usuario.findOne({
        where: { email: email }
    });
    if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'}); }

    const user = await Usuario.create({nombre: nombre, email: email, contrasenya: contrasenya, direccion: direccion});
    res.json(user)
}

exports.eliminarUsuario = async (req, res) => {
    const borrarUsuario = await Usuario.destroy({
        where: {
            id: req.usuario.id
        }
    })

    if (borrarUsuario === 0) return res.json('Credenciales no validos.')

    res.json('Usuario eliminado.')    
}

exports.login = async (req, res) => {
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
}

exports.logout = async (req, res) => {
    const {id} = req.body;
    
    const logout = await Token.destroy({
        where: {
            [Op.and]: [
                {usuarioId: req.usuario.id},
                {id: id}
            ]
        }
    })
    res.json('Logout completed')
}

