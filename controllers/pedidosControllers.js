const pool = require('../config/db');

// Función para obtener el ID del usuario basado en el nombre
const getUsuarioId = async (nombre_usuario) => {
    const [usuario] = await pool.query('SELECT ID_Usuario FROM Usuarios WHERE usuario = ?', [nombre_usuario]);
    return usuario.length > 0 ? usuario[0].ID_Usuario : null;
};

// Función para crear un pedido
const createPedido = async (req, res) => {
    const { nombre_usuario, nombre, calle, colonia, estado, pais, modelo, talla_id, cantidad, categoria, nombre_tarjeta, numero_tarjeta, cvc } = req.body;

    // Verificar que todos los campos están presentes
    if (!nombre_usuario || !nombre || !calle || !colonia || !estado || !pais ||
        !modelo || !talla_id || !cantidad || !categoria ||
        !nombre_tarjeta || !numero_tarjeta || !cvc) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        // Obtener el ID del usuario basado en el nombre
        const cliente_id = await getUsuarioId(nombre_usuario);
        if (!cliente_id) {
            return res.status(400).json({ error: 'Usuario no encontrado.' });
        }

        // Insertar el pedido
        const [result] = await pool.query(
            `INSERT INTO pedidos (cliente_id, Nombre, Calle, Colonia, Estado, Pais, modelo, talla_id, cantidad, categoria, fecha, nombre_tarjeta, numero_tarjeta, cvc)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?)`,
            [cliente_id, nombre, calle, colonia, estado, pais, modelo, talla_id, cantidad, categoria, nombre_tarjeta, numero_tarjeta, cvc]
        );

        res.status(201).json({ message: 'Pedido creado con éxito', pedidoId: result.insertId });
    } catch (error) {
        console.error('Error al insertar el pedido:', error);
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
};

module.exports = {
    createPedido
};
