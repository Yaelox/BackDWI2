const pool = require('../config/db');

const createPedido = async (req, res) => {
    const { cliente_id, nombre_tarjeta, numero_tarjeta, fecha_expiracion, cvc } = req.body;

    if (!cliente_id || !nombre_tarjeta || !numero_tarjeta || !fecha_expiracion || !cvc) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        // Verificar la existencia del cliente
        const [cliente] = await pool.query('SELECT id FROM clientes WHERE id = ?', [cliente_id]);
        if (cliente.length === 0) {
            return res.status(400).json({ error: 'Cliente no encontrado.' });
        }

        // Insertar el pedido
        const [result] = await pool.query(
            `INSERT INTO pedidos (cliente_id, nombre_tarjeta, numero_tarjeta, fecha_expiracion, cvc) VALUES (?, ?, ?, ?, ?)`,
            [cliente_id, nombre_tarjeta, numero_tarjeta, fecha_expiracion, cvc]
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