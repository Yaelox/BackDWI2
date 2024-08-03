const bcrypt = require('bcrypt');
const db = require('../config/db');
// Controlador para restablecer la contraseña
const resetPassword = (req, res) => {
    const { email, newPassword } = req.body;
  
    db.query('SELECT * FROM Usuarios WHERE email = ?', [email])
      .then(([users]) => {
        if (users.length === 0) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
  
        return bcrypt.hash(newPassword, 10);
      })
      .then((hashedPassword) => {
        return db.query('UPDATE Usuarios SET contraseña = ? WHERE email = ?', [hashedPassword, email]);
      })
      .then(() => {
        res.json({ message: 'Contraseña actualizada correctamente' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error del servidor', error });
      });
  };
  
  module.exports = { resetPassword };