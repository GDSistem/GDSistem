const express = require('express');

const { getListaPrecios } = require('../../controllers/ventas/lista_precios_controllers.js');

const router = express.Router();

// Ruta para obtener lista de precios
router.post('/factura/lista-precios', getListaPrecios);

module.exports = router;