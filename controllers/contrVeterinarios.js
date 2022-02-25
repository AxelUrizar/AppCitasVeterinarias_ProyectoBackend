const {Veterinario} = require('../models')

exports.getAll = async (req, res) => {
    try {
        const mostrarVeterinarios = await Veterinario.findAll()

        return res.status(200).json(mostrarVeterinarios)        
    } catch (error) {
        return res.status(500).json(error)
    }
}