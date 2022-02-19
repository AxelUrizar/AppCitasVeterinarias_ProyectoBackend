'use strict';
const {v4: uuidv4} = require('uuid')


module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Usuarios', [{
      id: uuidv4(),
      nombre: 'John Doe',
      email: 'demo@demo.com',
      contrasenya: '$321!pass!123$',
      direccion: 'Calle/ Inventada Nº30',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nombre: 'Jean Cantón',
      email: 'demo2@demo.com',
      contrasenya: '$321!pass!123$',
      direccion: 'Puente/ Inventada Nº30',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: uuidv4(),
      nombre: 'Maria Martín',
      email: 'demo3@demo.com',
      contrasenya: '$321!pass!123$',
      direccion: 'Pasaje/ Inventada Nº30',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
