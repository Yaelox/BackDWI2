const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const crudRoutes = require('./routes/crudRoutes');
const pokemonRoutes =  require('./routes/pokemonRoutes');
const contactoRoutes = require('./routes/contactoRoutes');
const contraseñaRoutes = require('./routes/contraseñaRoutes');
const productosRoutes = require('./routes/productosRoutes'); // Añadido aquí
const rolesRoutes = require('./routes/rolesRoutes'); // Añadido aquí
const clientesRoutes = require('./routes/clientesRoutes'); // Añadido aquí
const pedidosRoutes = require('./routes/pedidosRoutes'); // Añadido aquí

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/crud', crudRoutes);
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/user', contraseñaRoutes);
app.use('/api/pd', productosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/cliente', clientesRoutes);
app.use('/api/pedidos', pedidosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});
