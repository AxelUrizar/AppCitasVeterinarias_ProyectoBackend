'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Mascota', [{
      nombre: 'Kay',
      especie: 'Pajaro',
      sexo: 'Femenino',
      usuarioId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Mascota', null, {});
  }
};
