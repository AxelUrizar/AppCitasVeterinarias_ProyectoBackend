const express = require("express");
const router = express.Router();
const contrVeterinarios = require('../controllers/contrVeterinarios')

router.get('/', contrVeterinarios.getAll)

module.exports = router