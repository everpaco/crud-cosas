'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ventas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      clienteId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Clientes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ventas');
  }
};
