const express = require('express');
const router = express.Router();
const { getDespacho, getSucursalDespacho } = require('../../controllers/ventas/despacho_controllers'); // Asegúrate de que la ruta sea correcta

// Ruta para obtener los despachos según empresa, sucursal y tipo de documento
router.post('/factura/despacho', getDespacho);
router.post('/factura/sucursal', getSucursalDespacho);

module.exports = router;
