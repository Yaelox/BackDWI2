const db = require('../config/db');

const getUsers = (req, res) => {
    db.query('SELECT * FROM Usuarios', (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(200).json(results);
    });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Usuarios WHERE ID_Usuario = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(results[0]);
    });
};

const createUser = (req, res) => {
    const { usuario, fecha_nacimiento, email, contraseña } = req.body;
    db.query('INSERT INTO Usuarios (usuario, fecha_nacimiento, email, contraseña) VALUES (?, ?, ?, ?)', 
    [usuario, fecha_nacimiento, email, contraseña], 
    (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ ID_Usuario: results.insertId, usuario, fecha_nacimiento, email, contraseña });
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const { usuario, fecha_nacimiento, email, contraseña } = req.body;
    db.query('UPDATE Usuarios SET usuario = ?, fecha_nacimiento = ?, email = ?, contraseña = ? WHERE ID_Usuario = ?', 
    [usuario, fecha_nacimiento, email, contraseña, id], 
    (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ ID_Usuario: id, usuario, fecha_nacimiento, email, contraseña });
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Usuarios WHERE ID_Usuario = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
