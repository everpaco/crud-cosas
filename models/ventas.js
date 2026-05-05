'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    static associate(models) {
      if (models.Cliente) {
        Venta.belongsTo(models.Cliente, { foreignKey: 'clienteId', as: 'cliente' });
      }
    }
  }

  Venta.init(
    {
      total: { type: DataTypes.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
      descripcion: { type: DataTypes.TEXT, allowNull: true },
      clienteId: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
      sequelize,
      modelName: 'Venta',
      tableName: 'Ventas',
      timestamps: true
    }
  );

  return Venta;
};
