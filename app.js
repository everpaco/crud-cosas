'use strict';
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const mueblesRoutes = require('./routes/mueblesRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const ventasRoutes = require('./routes/ventasRoutes');

const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

// servir frontend estático
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/muebles', mueblesRoutes);
app.use('/clientes', clientesRoutes);
app.use('/ventas', ventasRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'API activa' }));

// Fallback: servir `index.html` para rutas no reconocidas (SPA)
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

module.exports = app;
