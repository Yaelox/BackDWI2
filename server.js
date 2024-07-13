const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const crudRoutes = require('./routes/crudRoutes');
const pokemonRoutes =  require('./routes/pokemonRoutes')

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/crud', crudRoutes);
app.use('/api/pokemon', pokemonRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor HTTP corriendo en el puerto ${PORT}`);
});
