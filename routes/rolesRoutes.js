const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesControllers');

// Obtener todos los roles
router.get('/', rolesController.getAllRoles);

// Obtener un rol por ID
router.get('/:id', rolesController.getRoleById);

// Crear un nuevo rol
router.post('/', rolesController.createRole);

// Actualizar un rol
router.put('/:id', rolesController.updateRole);

// Eliminar un rol
router.delete('/:id', rolesController.deleteRole);

module.exports = router;
