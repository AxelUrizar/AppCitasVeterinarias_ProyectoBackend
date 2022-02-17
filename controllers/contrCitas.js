const {Mascota, Veterinario, Usuario, Cita} = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.mostrarCitas = async (req, res) => {
    const verCitas = await Cita.findAll();
    res.json(verCitas);
}

exports.citasUsuario = async (req, res) => {
    try {
        const verCitas = await Cita.findAll({
            where: {
                usuarioId: req.usuario.id
            },
            // attributes:
        })
    
        res.json(verCitas)
        
    } catch (error) {
        res.json(error)
    }
}

exports.nuevaCita = async (req, res) => {
    try {
        const { descripcion, mascotaId, veterinarioId } = req.body;

        const mascotaConf = await Mascota.findOne({
            where: {
                [Op.and]: [
                    {usuarioId: req.usuario.id},
                    {id: mascotaId} 
                ]
            }
        })

        const veterinarioConf = await Veterinario.findOne({
            where: {
                id: veterinarioId
            }
        })

        const usuarioId = await Usuario.findOne({
            where: {
                id: req.usuario.id
            }
        })

        const fecha = new Date()
        const fechaCitaCalc = fecha.toLocaleDateString(fecha.setDate(fecha.getDate() + 7))

        const nuevaCita = await Cita.create({ descripcion: descripcion, mascotaId: mascotaConf.id, veterinarioId: veterinarioConf.id, usuarioId: usuarioId.id, fechaCita: fechaCitaCalc })

        res.json(nuevaCita)
    } catch (error) {
        res.json(error)
    }
}

exports.borrarCita = async (req, res) => {
    try {
        const citaSelec = await Cita.findOne({
            where: {
                [Op.and]:[
                    {id: req.params.id},
                    {usuarioId: req.usuario.id}
                ]
            },
        })

        const borrarCita = await Cita.destroy({
            where: {
                id: citaSelec.id
            }
        })

        if (borrarCita === 1) return res.json('Cita borrada') 

    } catch (error) {
        res.json(error)
    }
    
}

exports.modificarCita = async (req, res) => {
    try {
        const { id } = req.body;
    
        const fecha = new Date()
        const fechaCitaCalc = fecha.toLocaleDateString(fecha.setDate(fecha.getDate() + 7))
    
        const citaActualizada = await Cita.update({
            fechaCita: fechaCitaCalc
        },
        {
            where: {
                [Op.and]: [
                    {id: id},
                    {usuarioId: req.usuario.id}
                ]
            }
        })
    
        const verCitas = await Cita.findOne({
            where: {
                usuarioId: req.usuario.id
            },
            attributes: ['fechaCita']
        })
        
        if (citaActualizada === 0) return 
        
        res.json(verCitas)

    } catch (error) {
        res.json(error)
    }
    
}