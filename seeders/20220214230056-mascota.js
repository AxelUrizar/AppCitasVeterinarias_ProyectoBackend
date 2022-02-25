'use strict';
const {v4: uuidv4} = require('uuid')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Mascota', [{
      id: 1,
      nombre: 'Kay',
      especie: 'Pajaro',
      sexo: 'Femenino',
      usuarioId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      nombre: 'Luna',
      especie: 'Pajaro',
      sexo: 'Femenino',
      usuarioId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      nombre: 'Roy',
      especie: 'Perro',
      sexo: 'Masculino',
      usuarioId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Mascota', null, {});
  }
};
