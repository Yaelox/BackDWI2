const express = require('express');
const router = express.Router();
const userController = require('../controllers/crudControllers');

// Ruta para agregar un nuevo usuario
router.post('/usuarios', userController.addUser);

// Ruta para eliminar un usuario por su ID
router.delete('/usuarios/:id', userController.deleteUser);

// Ruta para actualizar un usuario por su ID
router.put('/usuarios/:id', userController.updateUser);

module.exports = router;