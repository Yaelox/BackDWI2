const db = require('../config/db');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { validarContraseña } = require('../utils/validarContraseña');

// Función para agregar un nuevo usuario
const addUser = (req, res) => {
    const { usuario, fecha_nacimiento, email, contraseña } = req.body;

    // Validar la contraseña antes de continuar
    if (!validarContraseña(contraseña)) {
        return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos de seguridad.' });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = bcrypt.hashSync(contraseña, 10);

    const query = 'INSERT INTO Usuarios (usuario, fecha_nacimiento, email, contraseña) VALUES (?, ?, ?, ?)';
    db.query(query, [usuario, fecha_nacimiento, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            res.status(500).send('Error del servidor al agregar usuario');
        } else {
            res.json({ mensaje: 'Usuario agregado exitosamente', id: result.insertId });
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
            res.status(500).send('Error del servidor al eliminar usuario');
        } else {
            res.json({ mensaje: 'Usuario eliminado exitosamente' });
        }
    });
};

// Función para actualizar un usuario
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { usuario, fecha_nacimiento, email } = req.body;

    const query = 'UPDATE Usuarios SET usuario = ?, fecha_nacimiento = ?, email = ? WHERE ID_Usuario = ?';
    db.query(query, [usuario, fecha_nacimiento, email, userId], (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            res.status(500).send('Error del servidor al actualizar usuario');
        } else {
            res.json({ mensaje: 'Usuario actualizado exitosamente' });
        }
    });
};


module.exports = {
    addUser,
    deleteUser,
    updateUser
};
