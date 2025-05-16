// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getCliente } = require('../../controllers/ventas/clientes_controllers'); // Asegúrate de que la ruta sea correcta

router.post('/factura/cliente', getCliente);

module.exports = router;
