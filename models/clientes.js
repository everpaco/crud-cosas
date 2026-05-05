'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      if (models.Venta) {
        Cliente.hasMany(models.Venta, { foreignKey: 'clienteId', as: 'ventas' });
      }
    }
  }

  Cliente.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      telefono: { type: DataTypes.STRING, allowNull: true }
    },
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'Clientes',
      timestamps: true
    }
  );

  return Cliente;
};
