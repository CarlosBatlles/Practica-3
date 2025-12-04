const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
const PORT = 3001; // Puerto definido en contrato para Acquire

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB (ajusta la URL si usas Docker, ej: mongodb://mongo:27017/sd-db)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sd-practica';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
app.use('/', routes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servicio ACQUIRE escuchando en puerto ${PORT}`);
});