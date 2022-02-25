'use strict';
const {v4: uuidv4} = require('uuid')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Veterinarios', [{
      id: 1,
      nombre: 'Robert Jhonson',
      especialidad: 'Aerodinamizacion de la pata trasera derecha',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      nombre: 'Jean Chong',
      especialidad: 'Extremidades redundantes',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      nombre: 'Alexa Refacherita',
      especialidad: 'Aparato Intestinal',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Veterinarios', null, {});
  }
};
