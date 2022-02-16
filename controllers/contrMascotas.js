const {Mascota, Cita, Veterinario} = require('../models');
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
        res.json(mostrarMascotas)
    } catch (error) {
        res.json(error)
    }
}

exports.nuevaMascota = async (req, res) => {
    const { nombre, especie, sexo } = req.body;
    const nuevaMascota = await Mascota.create({nombre: nombre, especie:especie, sexo:sexo, usuarioId:req.usuario.id});

    res.json(nuevaMascota);    
}

exports.borrarMascota = async (req, res) => {
    const {nombre} = req.body;

    const borrarMascota = await Mascota.destroy({
        where: {
            [Op.and]: [
                {usuarioId: req.usuario.id},
                {nombre: nombre}
            ]
        }
    })

    res.json('Mascota eliminada.')    
}

