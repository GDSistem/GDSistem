// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getEmpresa } = require('../controllers/company_controllers.js');

router.post('/codEmpresa', getEmpresa);

module.exports = router;
