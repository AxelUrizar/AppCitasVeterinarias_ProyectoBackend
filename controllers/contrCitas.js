const {Mascota, Veterinario, Usuario, Cita} = require('../models');
const {v4: uuidv4} = require('uuid')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.mostrarCitas = async (req, res) => {
    try {
        const verCitas = await Cita.findAll();
        res.status(200).json(verCitas);
        
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.citasUsuario = async (req, res) => {
    try {
        const verCitas = await Cita.findAll({
            where: {
                usuarioId: req.usuario.id
            }
        })
    
        res.status(200).json(verCitas)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.citasMascota = async (req, res) => {
    try {
        const verCitas = await Cita.findAll({
            where: {
                mascotaId: req.params.id
            }
        })

        if(verCitas.length === 0) return res.status(200).json(false)

        return res.status(200).json(verCitas)
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.citaId = async (req, res) => {
    try {
        const {idCita} = req.params
        const citaId = await Cita.findOne({
            where: {
                id: idCita
            }
        })

        return res.status(200).json(citaId)
    } catch (error) {
        return res.status(500).json(error)
    }
}

exports.nuevaCita = async (req, res) => {
    try {
        const { descripcion, veterinarioId } = req.body;
        const id = req.params.id

        const mascotaConf = await Mascota.findOne({
            where: {
                [Op.and]: [
                    {usuarioId: req.usuario.id},
                    {id: id} 
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

        const nuevaCita = await Cita.create({ id: uuidv4(), descripcion: descripcion, mascotaId: mascotaConf.id, veterinarioId: veterinarioConf.id, usuarioId: usuarioId.id, fechaCita: fechaCitaCalc })

        return res.status(200).json(nuevaCita)

    } catch (error) {

        return res.status(500).json(error)
    }
}

exports.borrarCita = async (req, res) => {
    try {
        const citaSelec = await Cita.findOne({
            where: {
                [Op.and]:[
                    {id: req.params.idCita},
                    {usuarioId: req.usuario.id}
                ]
            },
        })

        const borrarCita = await Cita.destroy({
            where: {
                id: citaSelec.id
            }
        })

        if (borrarCita === 1) return res.status(200).json('Cita borrada') 

    } catch (error) {
        return res.status(500).json(error)
    }
    
}

exports.modificarCita = async (req, res) => {
    try {
        const { descripcion, veterinarioId } = req.body;
        const {idCita} = req.params
    
        const fecha = new Date()
        const fechaCitaCalc = fecha.toLocaleDateString(fecha.setDate(fecha.getDate() + 7))
    
        const citaActualizada = await Cita.update({
            fechaCita: fechaCitaCalc,
            descripcion: descripcion,
            veterinarioId: veterinarioId
        },
        {
            where: {
                [Op.and]: [
                    {id: idCita},
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
        
        return res.status(200).json(verCitas)

    } catch (error) {
        return res.status(500).json(error)
    }
    
}