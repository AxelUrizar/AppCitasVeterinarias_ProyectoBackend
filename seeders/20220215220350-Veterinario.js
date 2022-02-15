'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Veterinarios', [{
      nombre: 'Robert Jhonson',
      especialidad: 'Aerodinamizacion de la pata trasera derecha',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nombre: 'Jean Chong',
      especialidad: 'Extremidades redundantes',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
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
