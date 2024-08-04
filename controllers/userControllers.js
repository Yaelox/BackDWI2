const db = require('../config/db');

const getUsers = async (req, res) => {
  const query = `
      SELECT Usuarios.ID_Usuario, Usuarios.usuario, Usuarios.fecha_nacimiento, Usuarios.email, roles.role_name
      FROM Usuarios
      JOIN roles ON Usuarios.role_id = roles.id
  `;

  try {
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error al cargar usuarios:', err);
    res.status(500).json({ error: 'Error al cargar usuarios' });
  }
};

module.exports = { getUsers };
