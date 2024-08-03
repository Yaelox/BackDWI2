const db = require('../config/db');
const bcrypt = require('bcrypt');
const { validarContraseña } = require('../utils/validarContraseña');

const addUser = (req, res) => {
    const { usuario, fecha_nacimiento, email, contraseña, role_id } = req.body;

    if (!validarContraseña(contraseña)) {
        return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos de seguridad' });
    }

    const query = 'INSERT INTO Usuarios (usuario, fecha_nacimiento, email, contraseña, role_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [usuario, fecha_nacimiento, email, contraseña, role_id], (err, result) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            return res.status(500).send('Error del servidor al agregar usuario');
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
            return res.status(500).send('Error del servidor al eliminar usuario');
        } else {
            return res.json({ mensaje: 'Usuario eliminado exitosamente' });
        }
    });
};

const updateUser = (req, res) => {
    const userId = req.params.id;
    const { usuario, fecha_nacimiento, email, rol } = req.body;

    console.log('Datos recibidos:', { userId, usuario, fecha_nacimiento, email, rol });

    if (!rol) {
        return res.status(400).json({ mensaje: 'El rol es requerido' });
    }

    const getRoleIdQuery = 'SELECT id FROM roles WHERE role_name = ?';
    db.query(getRoleIdQuery, [rol], (err, roleResult) => {
        if (err) {
            console.error('Error al obtener el ID del rol:', err);
            return res.status(500).send('Error del servidor al obtener el ID del rol');
        }

        console.log('Resultado de la consulta del rol:', roleResult);

        if (roleResult.length === 0) {
            return res.status(400).json({ mensaje: 'Rol no válido' });
        }

        const roleId = roleResult[0].id;

        const query = 'UPDATE Usuarios SET usuario = ?, fecha_nacimiento = ?, email = ?, role_id = ? WHERE ID_Usuario = ?';
        const params = [usuario, fecha_nacimiento, email, roleId, userId];

        console.log('Consulta de actualización:', query);
        console.log('Parámetros de actualización:', params);

        db.query(query, params, (err, result) => {
            if (err) {
                console.error('Error al actualizar usuario:', err);
                return res.status(500).send('Error del servidor al actualizar usuario');
            } else {
                console.log('Resultado de la actualización:', result);
                return res.json({ mensaje: 'Usuario actualizado exitosamente' });
            }
        });
    });
};



module.exports = {
    addUser,
    deleteUser,
    updateUser
};