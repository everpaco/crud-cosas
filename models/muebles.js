'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Mueble extends Model {
    static associate(models) {
      // Un mueble puede pertenecer a una categoria si lo deseas
      if (models.Categoria) {
        Mueble.belongsTo(models.Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
      }
    }
  }

  Mueble.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      tipo: { type: DataTypes.STRING, allowNull: true },
      costo: { type: DataTypes.STRING, allowNull: true }
    },
    {
      sequelize,
      modelName: 'Mueble',
      tableName: 'Muebles',
      timestamps: true
    }
  );

  return Mueble;
};
