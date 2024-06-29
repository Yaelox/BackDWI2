const db = require('../config/db');
const bcrypt = require('bcrypt');
const { validarContraseña } = require('../utils/validarContraseña');

// Función para agregar un nuevo usuario con rol
const addUser = (req, res) => {
    const { usuario, fecha_nacimiento, email, contraseña, role_id } = req.body;

    console.log('Datos recibidos:', { usuario, fecha_nacimiento, email, contraseña, rol_id });

    // Validar la contraseña antes de continuar
    if (!validarContraseña(contraseña)) {
        console.log('Contraseña no válida');
        return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos de seguridad.' });
    }

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = bcrypt.hashSync(contraseña, 10);

    // Verificar que el rol esté definido y no sea undefined
    if (!rol) {
        console.log('Rol no definido');
        return res.status(400).json({ mensaje: 'El campo de rol no está definido.' });
    }

    // Primero, obtener el ID del rol correspondiente al nombre del rol
    const getRoleIdQuery = 'SELECT id FROM roles WHERE role_name = ?';
    db.query(getRoleIdQuery, [rol], (err, roleResult) => {
        if (err) {
            console.error('Error al obtener el ID del rol:', err);
            return res.status(500).send('Error del servidor al obtener el ID del rol');
        }

        console.log('Resultado de la consulta del rol:', roleResult);

        if (roleResult.length === 0) {
            console.log('Rol no encontrado:', rol);
            return res.status(400).json({ mensaje: 'Rol no válido' });
        }

        const roleId = roleResult[0].id;

        console.log('ID del rol obtenido:', roleId);

        // Insertar el nuevo usuario con el ID del rol obtenido
        const insertUserQuery = 'INSERT INTO Usuarios (usuario, fecha_nacimiento, email, contraseña, role_id) VALUES (?, ?, ?, ?, ?)';
        db.query(insertUserQuery, [usuario, fecha_nacimiento, email, hashedPassword, roleId], (err, result) => {
            if (err) {
                console.error('Error al agregar usuario:', err);
                return res.status(500).send('Error del servidor al agregar usuario');
            }

            // Devolver respuesta de éxito con el ID insertado
            return res.json({ mensaje: 'Usuario agregado exitosamente', id: result.insertId });
        });
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

// Función para actualizar un usuario con rol
const updateUser = (req, res) => {
    const userId = req.params.id;
    const { usuario, fecha_nacimiento, email, rol, contraseña } = req.body;

    const getRoleIdQuery = 'SELECT id FROM roles WHERE role_name = ?';
    db.query(getRoleIdQuery, [rol], (err, roleResult) => {
        if (err) {
            console.error('Error al obtener el ID del rol:', err);
            return res.status(500).send('Error del servidor al obtener el ID del rol');
        }

        if (roleResult.length === 0) {
            return res.status(400).json({ mensaje: 'Rol no válido' });
        }

        const roleId = roleResult[0].id;

        let query = 'UPDATE Usuarios SET usuario = ?, fecha_nacimiento = ?, email = ?, role_id = ? WHERE ID_Usuario = ?';
        let params = [usuario, fecha_nacimiento, email, roleId, userId];

        if (contraseña) {
            if (!validarContraseña(contraseña)) {
                return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos de seguridad.' });
            }
            const hashedPassword = bcrypt.hashSync(contraseña, 10);
            query = 'UPDATE Usuarios SET usuario = ?, fecha_nacimiento = ?, email = ?, role_id = ?, contraseña = ? WHERE ID_Usuario = ?';
            params = [usuario, fecha_nacimiento, email, roleId, hashedPassword, userId];
        }

        db.query(query, params, (err, result) => {
            if (err) {
                console.error('Error al actualizar usuario:', err);
                return res.status(500).send('Error del servidor al actualizar usuario');
            } else {
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