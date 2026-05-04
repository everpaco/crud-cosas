'use strict';
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const mueblesRoutes = require('./routes/mueblesRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// servir frontend estático
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/categorias', categoriasRoutes);
app.use('/muebles', mueblesRoutes);

app.get('/', (req, res) => res.json({ ok: true, message: 'API activa' }));

module.exports = app;
