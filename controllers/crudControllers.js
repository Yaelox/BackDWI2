const db = require('../config/db');
const { validarContraseña } = require('../utils/validarContraseña');
const bcrypt = require('bcrypt');

// Función para agregar un usuario
const addUser = async (req, res) => {
    const { usuario, fecha_nacimiento, email, contraseña, role_id } = req.body;

    // Validar la contraseña
    if (!validarContraseña(contraseña)) {
        return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos de seguridad' });
    }

    const hash = bcrypt.hashSync(contraseña, 10); // Asumiendo que estás usando bcrypt para el hash

    try {
        const [result] = await db.query('INSERT INTO Usuarios (usuario, fecha_nacimiento, email, contraseña, role_id) VALUES (?, ?, ?, ?, ?)', [usuario, fecha_nacimiento, email, hash, role_id]);
        return res.status(201).json({ mensaje: 'Usuario agregado exitosamente', userId: result.insertId });
    } catch (err) {
        console.error('Error al agregar usuario:', err);
        return res.status(500).json({ mensaje: 'Error del servidor al agregar usuario' });
    }
};
// Función para eliminar un usuario
const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const [result] = await db.query('DELETE FROM Usuarios WHERE ID_Usuario = ?', [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        return res.json({ mensaje: 'Usuario eliminado exitosamente' });
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
        return res.status(500).json({ mensaje: 'Error del servidor al eliminar usuario' });
    }
};

// Función para actualizar un usuario
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { usuario, fecha_nacimiento, email, rol } = req.body;

    if (!rol) {
        return res.status(400).json({ mensaje: 'El rol es requerido' });
    }

    const query = 'UPDATE Usuarios SET usuario = ?, fecha_nacimiento = ?, email = ?, role_id = ? WHERE ID_Usuario = ?';
    const params = [usuario, fecha_nacimiento, email, rol, userId];

    try {
        const [result] = await db.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        return res.json({ mensaje: 'Usuario actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
        return res.status(500).json({ mensaje: 'Error del servidor al actualizar usuario' });
    }
};

module.exports = {
    addUser,
    deleteUser,
    updateUser
};
