const jwt = require("jsonwebtoken");
const {Usuario} = require('../models');

const auth = async (req, res, next) => {

    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findOne({
      where: {
        id: data.id
      }
    });
    if (!usuario) return new Error()
    req.usuario = usuario;
    req.token = token;
    next();
};
module.exports = auth;