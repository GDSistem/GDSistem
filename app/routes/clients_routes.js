// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getCliente } = require('../controllers/clients_controllers');

router.get('/', getCliente);

module.exports = router;
