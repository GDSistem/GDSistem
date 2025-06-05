// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getProductos, getProducto } = require('../../controllers/ventas/productos_controllers.js');

router.post('/factura/productos', getProductos);
router.post('/factura/producto', getProducto);

module.exports = router;
