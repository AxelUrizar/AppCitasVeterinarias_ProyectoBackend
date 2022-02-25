'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mascota', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      especie: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sexo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      usuarioId: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Usuarios',
          key: 'id',
          as: 'usuarioId'
        }
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
    await queryInterface.dropTable('Mascota');
  }
};