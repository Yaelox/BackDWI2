const express = require('express');
const router = express.Router();
const { addContacto } = require('../controllers/contactoControllers');

// Ruta para agregar un nuevo contacto
router.post('/', addContacto);

module.exports = router;
