const express = require('express');
const router = express.Router();

const { getTipoPersonas } = require('../../controllers/ventas/tipo_personas_controllers.js');

router.post('/factura/tipo-personas', getTipoPersonas);

module.exports = router;