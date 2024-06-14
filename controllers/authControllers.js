const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { validarContraseña } = require('../utils/validarContraseña');

exports.registro = (req, res) => {
    const { usuario, fecha_nacimiento, email, contraseña } = req.body;

    if (!validarContraseña(contraseña)) {
        return res.status(400).json({ mensaje: 'La contraseña no cumple con los requisitos de seguridad.' });
    }

    const hash = bcrypt.hashSync(contraseña, 10);

    const query = 'INSERT INTO Usuarios (usuario, fecha_nacimiento, email, contraseña) VALUES (?, ?, ?, ?)';
    db.query(query, [usuario, fecha_nacimiento, email, hash], (err, result) => {
        if (err) {
            console.error('Error al registrar usuario:', err);
            return res.status(500).json({ mensaje: 'Error al registrar usuario.' });
        }
        res.status(201).json({ mensaje: 'Usuario registrado exitosamente.' });
    });
};

exports.login = (req, res) => {
    const { usuario, contraseña } = req.body;

    const query = 'SELECT * FROM Usuarios WHERE usuario = ?';
    db.query(query, [usuario], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ mensaje: 'Error al iniciar sesión.' });
        }

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
    });
};
