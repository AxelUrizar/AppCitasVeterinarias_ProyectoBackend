const {Mascota, Cita, Veterinario} = require('../models');
const {v4: uuidv4} = require('uuid')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.mostrarTodo = async (req, res) => {
    const mostrarMascotas = await Mascota.findAll();
    return res.json(mostrarMascotas);
}

exports.mostrarUsuario = async (req, res) => {
    try {
        const mostrarMascotas = await Mascota.findAll({
            where: {
                usuarioId: req.usuario.id
            }
        })

        if (mostrarMascotas === null) return res.status(404)
        return res.status(200).json(mostrarMascotas)
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.buscarMascotaId = async (req, res) => {
    try {
        const buscarMascotaId = await Mascota.findOne({
            where: {
                id: req.params.id
            }
        })
        
        if(!buscarMascotaId) return res.status(404).json('Mascota no encontrada')
        return res.status(200).json(buscarMascotaId.dataValues)
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.nuevaMascota = async (req, res) => {
    try {
    const { nombre, especie, sexo } = req.body;
        const nuevaMascota = await Mascota.create({
            id: uuidv4(),
            nombre: nombre, 
            especie: especie,
            sexo: sexo,
            usuarioId:req.usuario.id
        });

        return res.json(nuevaMascota);    
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.borrarMascota = async (req, res) => {
    try {
        const {nombre} = req.body;
    
        const borrarMascota = await Mascota.destroy({
            where: {
                [Op.and]: [
                    {usuarioId: req.usuario.id},
                    {nombre: nombre}
                ]
            }
        })
        
        return res.status(200).json('Mascota eliminada.')    
    } catch (error) {
        return res.status(500).json(error)
    }
}

