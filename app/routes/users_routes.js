// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getUsuarios } = require('../controllers/users_controllers.js');
const { loginUsuario } = require('../controllers/users_controllers.js');

router.get('/', getUsuarios);
router.post('/login', loginUsuario);

module.exports = router;
