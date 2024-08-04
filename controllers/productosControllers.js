const db = require('../config/db'); // Importa el pool de promesas

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    const query = 'SELECT * FROM productos'; // Definir la consulta SQL

    try {
        const [results] = await db.query(query); // Ejecutar la consulta con promesas
        return res.json(results); // Enviar la respuesta con los resultados
    } catch (err) {
        console.error('Error al obtener los productos:', err);
        return res.status(500).send('Error del servidor al obtener los productos');
    }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM productos WHERE id = ?';
    
    try {
        const [result] = await db.query(query, [productId]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.json(result[0]);
    } catch (err) {
        console.error('Error al obtener el producto:', err);
        return res.status(500).send('Error del servidor al obtener el producto');
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    const { nombre, descripcion, precio, talla_id, categoria, stock } = req.body;

    // Aquí podrías agregar validaciones adicionales si es necesario

    const query = 'INSERT INTO productos (nombre, descripcion, precio, talla_id, categoria, stock) VALUES (?, ?, ?, ?, ?, ?)';
    
    try {
        const [result] = await db.query(query, [nombre, descripcion, precio, talla_id, categoria, stock]);
        return res.status(201).json({ id: result.insertId, nombre, descripcion, precio, talla_id, categoria, stock });
    } catch (err) {
        console.error('Error al crear el producto:', err);
        return res.status(500).send('Error del servidor al crear el producto');
    }
};

// Actualizar un producto existente
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { nombre, descripcion, precio, talla_id, categoria, stock } = req.body;

    // Aquí podrías agregar validaciones adicionales si es necesario

    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, talla_id = ?, categoria = ?, stock = ? WHERE id = ?';
    
    try {
        const [result] = await db.query(query, [nombre, descripcion, precio, talla_id, categoria, stock, productId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.json({ message: 'Producto actualizado exitosamente' });
    } catch (err) {
        console.error('Error al actualizar el producto:', err);
        return res.status(500).send('Error del servidor al actualizar el producto');
    }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM productos WHERE id = ?';
    
    try {
        const [result] = await db.query(query, [productId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.json({ message: 'Producto eliminado exitosamente' });
    } catch (err) {
        console.error('Error al eliminar el producto:', err);
        return res.status(500).send('Error del servidor al eliminar el producto');
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
