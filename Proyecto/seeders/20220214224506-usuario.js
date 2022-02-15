'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Usuarios', [{
      nombre: 'John Doe',
      email: 'demo@demo.com',
      contrasenya: '$321!pass!123$',
      direccion: 'Calle/ Inventada Nº30',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
