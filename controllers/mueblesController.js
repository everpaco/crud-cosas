'use strict';
const { Mueble, Categoria } = require('../models');

exports.list = async (req, res) => {
  try {
    const muebles = await Mueble.findAll({ include: [{ model: Categoria, as: 'categoria' }] });
    return res.json(muebles);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre, tipo, costo, categoriaId } = req.body;
    if (!nombre) return res.status(400).json({ message: 'Nombre requerido' });
    const m = await Mueble.create({ nombre, tipo, costo, categoriaId });
    return res.status(201).json(m);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const m = await Mueble.findByPk(id);
    if (!m) return res.status(404).json({ message: 'Mueble no encontrado' });
    await m.destroy();
    return res.json({ message: 'Mueble eliminado' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, tipo, costo, categoriaId } = req.body;
    const m = await Mueble.findByPk(id);
    if (!m) return res.status(404).json({ message: 'Mueble no encontrado' });
    m.nombre = nombre || m.nombre;
    m.tipo = tipo || m.tipo;
    m.costo = costo !== undefined ? costo : m.costo;
    m.categoriaId = categoriaId || m.categoriaId;
    await m.save();
    return res.json(m);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
