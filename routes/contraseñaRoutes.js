const express = require('express');
const { resetPassword } = require('../controllers/contraseñaControllers');

const router = express.Router();

router.post('/reset-password', resetPassword);

module.exports = router;
