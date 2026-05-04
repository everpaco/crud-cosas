'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Asociaciones si se requieren
    }
  }

  Usuario.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nombre'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
        field: 'email'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        field: 'rol'
      }
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'Usuarios',
      timestamps: true
    }
  );

  return Usuario;
};
