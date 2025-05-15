// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getFactura } = require('../../controllers/ventas/facturacion_controllers.js');

router.get('/factura/formulario', getFactura);

module.exports = router;
