const db = require('../config/db');

const getUsers = (req, res) => {
  const query = `
      SELECT Usuarios.ID_Usuario, Usuarios.usuario, Usuarios.fecha_nacimiento, Usuarios.email, roles.role_name
      FROM Usuarios
      JOIN roles ON Usuarios.role_id = roles.id
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error al cargar usuarios:', err);
          res.status(500).json({ error: 'Error al cargar usuarios' });
      } else {
          res.status(200).json(results);
      }
  });
};
  
  module.exports = { getUsers };