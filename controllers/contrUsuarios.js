const jwt = require('jsonwebtoken');
const {Usuario, Mascota, Token, Cita, Veterinario} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.mostrarUsuarios = async (req, res, next) => {
    try {
        const verUsuarios = await Usuario.findAll({
            include: [{
                model: Mascota
            }]
        })
        
        res.status(200).json(verUsuarios)
    } catch (error) {
        res.status(500).json(error)
    }
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

        if (findOne === null) return res.status(401).json('Credenciales no válidas')
        
        res.json(verUsuario)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.nuevoUsuario = async (req, res, next) => {
    try {
        const {nombre, email, contrasenya, direccion} = req.body;
    
        const userExists = await Usuario.findOne({
            where: { email: email }
        });
        if (userExists !== null)  return res.status(401).json({message: 'Introduzca un email valido'}); 
    
        const user = await Usuario.create({nombre: nombre, email: email, contrasenya: contrasenya, direccion: direccion});
        
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {
        const borrarUsuario = await Usuario.destroy({
            where: {
                id: req.usuario.id
            }
        })
    
        if (borrarUsuario === 0) return res.status(401).json('Credenciales no validos.')
    
        res.status(200).json('Usuario eliminado.')    
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.login = async (req, res) => {
    try {
        const {email, contrasenya} = req.body;
    
        const usuario = await Usuario.findOne({
            where: {
                email: email,
                contrasenya: contrasenya
            }
        });
    
        if (usuario === null) return res.status(401).json('No se pudo realizar esa acción')
    
        const generarToken = jwt.sign({id: usuario.id, nombre: usuario.nombre, email:usuario.email}, process.env.JWT_SECRET)
        const login = await Token.create({token: generarToken, usuarioId: usuario.id});
    
        res.status(200).json({User_Status: 'Logged', token: generarToken});
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.logout = async (req, res) => {
    try {
        const {id} = req.body;
        
        const logout = await Token.destroy({
            where: {
                [Op.and]: [
                    {usuarioId: req.usuario.id},
                    {id: id}
                ]
            }
        })

        if (logout === 0) return res.status(404).json({error_message: 'Introduce un token válido' })
        res.status(200).json('Logout completed')
        
    } catch (error) {
        res.status(500).json(error)
    }
}

