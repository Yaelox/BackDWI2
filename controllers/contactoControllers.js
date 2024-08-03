const db = require('../config/db');

// Función para agregar un nuevo contacto
const addContacto = (req, res) => {
    const { Nombre, Correo, Mensaje, NombreUsuario } = req.body;

    console.log('Datos recibidos:', { Nombre, Correo, Mensaje, NombreUsuario });

    // Verificar que todos los campos estén presentes
    if (!Nombre || !Correo || !Mensaje || !NombreUsuario) {
        console.log('Faltan parámetros');
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    // Obtener el ID del usuario basado en el nombre
    const getUserIdQuery = 'SELECT ID_Usuario FROM Usuarios WHERE usuario = ?';
    db.query(getUserIdQuery, [NombreUsuario], (err, result) => {
        if (err) {
            console.error('Error al obtener el ID del usuario:', err);
            return res.status(500).send('Error del servidor al obtener el ID del usuario');
        }

        if (result.length === 0) {
            console.log('Usuario no encontrado:', NombreUsuario);
            return res.status(400).json({ mensaje: 'Usuario no encontrado.' });
        }

        const ID_Usuario = result[0].ID_Usuario;

        // Insertar el nuevo contacto
        const insertContactoQuery = 'INSERT INTO Contacto (Nombre, Correo, Mensaje, ID_Usuario) VALUES (?, ?, ?, ?)';
        db.query(insertContactoQuery, [Nombre, Correo, Mensaje, ID_Usuario], (err, result) => {
            if (err) {
                console.error('Error al agregar contacto:', err);
                return res.status(500).send('Error del servidor al agregar contacto');
            }

            // Devolver respuesta de éxito con el ID insertado
            return res.json({ mensaje: 'Contacto agregado exitosamente', id: result.insertId });
        });
    });
};

module.exports = { addContacto };