const {Mascota, Cita, Veterinario} = require('../models');
const {v4: uuidv4} = require('uuid')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

exports.mostrarTodo = async (req, res) => {
    const mostrarMascotas = await Mascota.findAll();
    res.json(mostrarMascotas);
}

exports.mostrarUsuario = async (req, res) => {
    try {
        const mostrarMascotas = await Mascota.findAll({
            where: {
                usuarioId: req.usuario.id
            },
            include: {
                model: Cita,
                include: {
                    model: Veterinario,
                    as: 'veterinario',
                    attributes: [
                        'nombre', 'especialidad'
                    ]
                },
                attributes:[
                    'descripcion', 'fechaCita'
                ]
            },
            attributes: [
                'nombre', 'especie', 'sexo'
            ]
        })

        if (mostrarMascotas === null) return res.status(404)
        res.status(200).json(mostrarMascotas)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.nuevaMascota = async (req, res) => {
    try {
        const { nombre, especie, sexo } = req.body;
        const nuevaMascota = await Mascota.create({
            id: uuidv4(),
            nombre: nombre, 
            especie:especie, 
            sexo:sexo, 
            usuarioId:req.usuario.id
        });

        res.json(nuevaMascota);    
        
    } catch (error) {
        res.status(500).json(error)
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
        
        res.status(200).json('Mascota eliminada.')    
    } catch (error) {
        res.status(500).json(error)
    }
}

