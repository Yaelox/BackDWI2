const pool = require('../config/db');


// Obtener todos los roles
const getAllRoles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM roles');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al obtener los roles' });
    }
};

// Obtener un rol por ID
const getRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM roles WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al obtener el rol' });
    }
};

// Crear un nuevo rol
const createRole = async (req, res) => {
    const { role_name, permissions } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO roles (role_name, permissions) VALUES (?, ?)', [role_name, JSON.stringify(permissions)]);
        res.status(201).json({ mensaje: 'Rol creado exitosamente', id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al crear el rol' });
    }
};

// Actualizar un rol
const updateRole = async (req, res) => {
    const { id } = req.params;
    const { role_name, permissions } = req.body;
    try {
        const [result] = await pool.query('UPDATE roles SET role_name = ?, permissions = ? WHERE id = ?', [role_name, JSON.stringify(permissions), id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }
        res.json({ mensaje: 'Rol actualizado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al actualizar el rol' });
    }
};

// Eliminar un rol
const deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM roles WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }
        res.json({ mensaje: 'Rol eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: 'Error al eliminar el rol' });
    }
};

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};