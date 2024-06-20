const db = require('../config/db');

const getUsers = (req, res) => {
    const query = 'SELECT * FROM Usuarios';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Server error');
      } else {
        res.json(results);
      }
    });
  };
  
  module.exports = { getUsers };