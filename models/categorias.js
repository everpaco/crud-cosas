'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      if (models.Mueble) {
        Categoria.hasMany(models.Mueble, { foreignKey: 'categoriaId', as: 'muebles' });
      }
    }
  }

  Categoria.init(
    {
      nombre: { type: DataTypes.STRING, allowNull: false },
      descripcion: { type: DataTypes.TEXT, allowNull: true }
    },
    {
      sequelize,
      modelName: 'Categoria',
      tableName: 'Categorias',
      timestamps: true
    }
  );

  return Categoria;
};
