'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cita', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mascotaId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Mascota',
          key: 'id'
        },
        allowNull: false
      },
      veterinarioId: {
        type: Sequelize.UUID,
        references: {
          model: 'Veterinarios',
          key: 'id'
        },
        allowNull: false
      },
      usuarioId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Usuarios',
          key: 'id'
        },
        allowNull: false
      },
      fechaCita: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Cita');
  }
};