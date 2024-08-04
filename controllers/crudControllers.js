const db = require('../config/db');
const { validarContraseña } = require('../utils/validarContraseña');

// Función para agregar un usuario
const addUser = (req, res) => {
    const { usuario, fecha_nacimiento, email, contraseña, role_id } = req.body;

    // Validar la contraseña
    if (!validarContraseña(contraseña)) {
        return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos de seguridad' });
    }

    const query = 'INSERT INTO Usuarios (usuario, fecha_nacimiento, email, contraseña, role_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [usuario, fecha_nacimiento, email, contraseña, role_id], (err, result) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            return res.status(500).json({ mensaje: 'Error del servidor al agregar usuario' });
        } else {
            return res.status(201).json({ mensaje: 'Usuario agregado exitosamente', userId: result.insertId });
        }
    });
};

// Función para eliminar un usuario
const deleteUser = (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM Usuarios WHERE ID_Usuario = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({ mensaje: 'Error del servidor al eliminar usuario' });
        } else if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        } else {
            return res.json({ mensaje: 'Usuario eliminado exitosamente' });
        }
    });
};

// Función para actualizar un usuario
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { usuario, fecha_nacimiento, email, rol } = req.body;

    console.log('Datos recibidos:', { userId, usuario, fecha_nacimiento, email, rol });

    if (!rol) {
        return res.status(400).json({ mensaje: 'El rol es requerido' });
    }

    const query = 'UPDATE Usuarios SET usuario = ?, fecha_nacimiento = ?, email = ?, role_id = ? WHERE ID_Usuario = ?';
    const params = [usuario, fecha_nacimiento, email, rol, userId];

    console.log('Consulta de actualización:', query);
    console.log('Parámetros de actualización:', params);

    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({ mensaje: 'Error del servidor al actualizar usuario' });
        } else if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        } else {
            console.log('Resultado de la actualización:', result);
            return res.json({ mensaje: 'Usuario actualizado exitosamente' });
        }
    });
};

module.exports = {
    addUser,
    deleteUser,
    updateUser
};
