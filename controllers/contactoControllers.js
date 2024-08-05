const db = require('../config/db');

// Función para agregar un nuevo contacto
const addContacto = async (req, res) => {
    const { Nombre, Correo, Mensaje, NombreUsuario } = req.body;

    console.log('Datos recibidos:', { Nombre, Correo, Mensaje, NombreUsuario });

    // Verificar que todos los campos estén presentes
    if (!Nombre || !Correo || !Mensaje || !NombreUsuario) {
        console.log('Faltan parámetros');
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    try {
        // Obtener el ID del usuario basado en el nombre
        const [result] = await db.query('SELECT ID_Usuario FROM Usuarios WHERE usuario = ?', [NombreUsuario]);
        
        if (result.length === 0) {
            console.log('Usuario no encontrado:', NombreUsuario);
            return res.status(400).json({ mensaje: 'Usuario no encontrado.' });
        }

        const ID_Usuario = result[0].ID_Usuario;

        // Insertar el nuevo contacto
        const [insertResult] = await db.query('INSERT INTO Contacto (Nombre, Correo, Mensaje, ID_Usuario) VALUES (?, ?, ?, ?)', [Nombre, Correo, Mensaje, ID_Usuario]);
        
        // Devolver respuesta de éxito con el ID insertado
        return res.json({ mensaje: 'Contacto agregado exitosamente', id: insertResult.insertId });
    } catch (err) {
        console.error('Error al agregar contacto:', err);
        return res.status(500).send('Error del servidor al agregar contacto');
    }
};

module.exports = { addContacto };
