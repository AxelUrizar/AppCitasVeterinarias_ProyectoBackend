'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cita', [{
      descripcion: 'Dolencia de ala',
      mascotaId: 1,
      veterinarioId: 1,
      usuarioId: 1,
      fechaCita: '24/2/2022',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descripcion: 'Plumaje maltratado',
      mascotaId: 2,
      veterinarioId: 2,
      usuarioId: 2,
      fechaCita: '24/2/2022',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descripcion: 'Exceso de facha',
      mascotaId: 3,
      veterinarioId: 3,
      usuarioId: 3,
      fechaCita: '24/2/2022',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cita', null, {});

  }
}
