'use strict';
const { Venta, Cliente } = require('../models');

exports.list = async (req, res) => {
  try {
    const ventas = await Venta.findAll({ include: [{ model: Cliente, as: 'cliente' }] });
    return res.json(ventas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.create = async (req, res) => {
  try {
    const { total, descripcion, clienteId } = req.body;
    if (total === undefined) return res.status(400).json({ message: 'Total requerido' });
    const v = await Venta.create({ total, descripcion, clienteId });
    return res.status(201).json(v);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const v = await Venta.findByPk(id);
    if (!v) return res.status(404).json({ message: 'Venta no encontrada' });
    await v.destroy();
    return res.json({ message: 'Venta eliminada' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { total, descripcion, clienteId } = req.body;
    const v = await Venta.findByPk(id);
    if (!v) return res.status(404).json({ message: 'Venta no encontrada' });
    v.total = total !== undefined ? total : v.total;
    v.descripcion = descripcion || v.descripcion;
    v.clienteId = clienteId || v.clienteId;
    await v.save();
    return res.json(v);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
