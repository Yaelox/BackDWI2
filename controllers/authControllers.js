const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { validarContraseña } = require('../utils/validarContraseña');

exports.registro = async (req, res) => {
    const { usuario, fecha_nacimiento, email, contraseña, role_id } = req.body;

    if (!validarContraseña(contraseña)) {
        return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos de seguridad.' });
    }

    const hash = bcrypt.hashSync(contraseña, 10);

    try {
        // Ejecuta la consulta y recibe solo los resultados
        const [result] = await db.query('INSERT INTO Usuarios (usuario, fecha_nacimiento, email, contraseña, role_id) VALUES (?, ?, ?, ?, ?)', [usuario, fecha_nacimiento, email, hash, role_id]);
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ mensaje: 'Error al registrar usuario.' });
    }
};


exports.login = async (req, res) => {
    const { usuario, contraseña } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM Usuarios WHERE usuario = ?', [usuario]);

        if (results.length === 0) {
            return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });
        }

        const user = results[0];
        if (bcrypt.compareSync(contraseña, user.contraseña)) {
            const token = jwt.sign({ usuario: user.usuario }, 'claveSecreta', { expiresIn: '1h' });
            res.json({ mensaje: 'Inicio de sesión exitoso', token });
        } else {
            res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos.' });
        }
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ mensaje: 'Error al iniciar sesión.' });
    }
};
