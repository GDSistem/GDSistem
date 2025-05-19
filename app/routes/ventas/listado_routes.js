// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getListado } = require('../../controllers/ventas/listado_controllers.js');

router.post('/factura/listado', getListado);

module.exports = router;
