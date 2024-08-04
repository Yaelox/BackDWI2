// clientesController.js
const pool = require('../config/db');

// Obtener todos los clientes
const getAllClientes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (err) {
        console.error('Error al obtener clientes:', err);
        res.status(500).json({ mensaje: 'Error al obtener los clientes' });
    }
};

module.exports = {
    getAllClientes
};
