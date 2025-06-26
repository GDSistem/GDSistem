const express = require('express');

const router = express.Router();
const { getVendedor } = require('../../controllers/ventas/vendedores_controllers');


router.post('/factura/vendedores', getVendedor)

module.exports = router;