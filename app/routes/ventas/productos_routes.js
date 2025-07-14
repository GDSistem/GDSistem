// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getProductos, getProducto, getSubProductoPorCodigo } = require('../../controllers/ventas/productos_controllers.js');

router.post('/factura/productos', getProductos);
router.post('/factura/producto', getProducto);
router.post('/factura/subproducto', getSubProductoPorCodigo);

module.exports = router;
