// routes/metodos.routes.js
const express = require('express');
const router = express.Router();
const { getDocumento } = require('../controllers/document_controllers');

router.get('/codDocumento', getDocumento);

module.exports = router;
