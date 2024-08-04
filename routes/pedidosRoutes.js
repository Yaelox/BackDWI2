const express = require('express');
const router = express.Router();
const { createPedido } = require('../controllers/pedidosControllers');

// Ruta para insertar un nuevo pedido
router.post('/', createPedido);

module.exports = router;
