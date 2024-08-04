const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosControllers');

// Obtener todos los productos
router.get('/', productosController.getAllProducts);

// Obtener un producto por ID
router.get('/:id', productosController.getProductById);

// Crear un nuevo producto
router.post('/', productosController.createProduct);

// Actualizar un producto existente
router.put('/:id', productosController.updateProduct);

// Eliminar un producto
router.delete('/:id', productosController.deleteProduct);

module.exports = router;