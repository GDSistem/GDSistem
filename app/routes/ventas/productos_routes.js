// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getProductos } = require('../../controllers/ventas/productos_controllers.js');

router.post('/factura/productos', getProductos);

module.exports = router;
