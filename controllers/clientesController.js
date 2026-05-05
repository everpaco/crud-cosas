'use strict';
const { Cliente } = require('../models');

exports.list = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    return res.json(clientes);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
    if (!nombre || !email) return res.status(400).json({ message: 'Nombre y email requeridos' });
    const c = await Cliente.create({ nombre, email, telefono });
    return res.status(201).json(c);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const c = await Cliente.findByPk(id);
    if (!c) return res.status(404).json({ message: 'Cliente no encontrado' });
    await c.destroy();
    return res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, email, telefono } = req.body;
    const c = await Cliente.findByPk(id);
    if (!c) return res.status(404).json({ message: 'Cliente no encontrado' });
    c.nombre = nombre || c.nombre;
    c.email = email || c.email;
    c.telefono = telefono || c.telefono;
    await c.save();
    return res.json(c);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
