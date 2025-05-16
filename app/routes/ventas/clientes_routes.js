// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getCliente } = require('../controllers/clientes_controllers');

router.get('/factura/cliente', getCliente);

module.exports = router;
