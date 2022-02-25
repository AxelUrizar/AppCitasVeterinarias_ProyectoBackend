const jwt = require("jsonwebtoken");
const {Usuario} = require('../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findOne({
      where: {
        id: data.id
      }
    });
    if (!usuario) return res.status(401).json('Introduce un token válido')
    req.usuario = data;
    req.token = token;
    
    next();
  } catch (error) {
    return res.status(500).json(error)
  }
  
};
module.exports = auth;