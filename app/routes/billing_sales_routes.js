// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getVentas } = require('../controllers/billing_sales_controllers.js');

router.post('/all-billing', getVentas);

module.exports = router;
