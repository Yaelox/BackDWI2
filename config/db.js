const mysql = require('mysql2/promise');
require('dotenv').config();

const db= mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

(async () => {
    try {
        // Prueba la conexión
        await db.getConnection();
        console.log('Conectado a la base de datos.');
    } catch (err) {
        console.error('Error conectando a la base de datos:', err);
    }
})();

module.exports = db;
