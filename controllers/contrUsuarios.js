const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
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
        
        return res.status(200).json(verUsuarios)
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.perfilUsuario = async (req, res, next) => {
    try {
        const verUsuario = await Usuario.findOne({
            where: {
                id: req.usuario.id
            }
        })

        if (!verUsuario) return res.status(401).json('Credenciales no válidas')
        
        return res.json(verUsuario)
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.nuevoUsuario = async (req, res, next) => {
    try {
        const {nombre, email, contrasenya} = req.body;
    
        const userExists = await Usuario.findOne({
            where: { email: email }
        });
        if (userExists !== null)  return res.status(401).json({message: 'Introduzca un email valido'}); 
    
        const encriptadoContr = await bcrypt.hash(contrasenya, 8);
        const user = await Usuario.create({id: uuidv4(), nombre: nombre, email: email, contrasenya: encriptadoContr});
        
        return res.status(200).json(user)
        
    } catch (error) {
        return res.status(500).json(error)
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
            }
        });
        if (usuario === null) return res.status(401).json('No se pudo realizar esa acción')

        const validarContraseña = await bcrypt.compare(contrasenya, usuario.contrasenya)
        
        if(!validarContraseña)return res.status(401).json('No se pudo realizar esa acción')
    
        const generarToken = jwt.sign({id: usuario.id, nombre: usuario.nombre, email:usuario.email}, process.env.JWT_SECRET)
        const login = await Token.create({id: uuidv4(), token: generarToken, usuarioId: usuario.id});
    
        return res.status(200).json({token: generarToken});
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.logout = async (req, res) => {
    try {        
        const logout = await Token.destroy({
            where: {
                [Op.and]: [
                    {usuarioId: req.usuario.id},
                    {token: req.token}
                ]
            }
        })

        if (!logout) return res.status(404).json({error_message: 'Introduce un token válido' })
        res.status(200).json('Logout completed')
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.logoutAll = async (req, res) => {
    try {        
        const logout = await Token.destroy({
            where: {
                usuarioId: req.usuario.id
            }
        })

        if (!logout) return res.status(404).json({error_message: 'Error de credenciales.' })
        res.status(200).json('Logout completed')
        
    } catch (error) {
        res.status(500).json(error)
    }
}

