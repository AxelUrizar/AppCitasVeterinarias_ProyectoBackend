'use strict';
const {v4: uuidv4} = require('uuid')


module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Usuarios', [{
      id: 1,
      nombre: 'John Doe',
      email: 'demo@demo.com',
      contrasenya: '$2b$08$xjVeE8VFAB8o0eLTT9ZANeJQp44n/JTqUl/7ZFJdTbOg2qEB8joM6',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      nombre: 'Jean Cantón',
      email: 'demo2@demo.com',
      contrasenya: '$2b$08$xjVeE8VFAB8o0eLTT9ZANeJQp44n/JTqUl/7ZFJdTbOg2qEB8joM6',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      nombre: 'Maria Martín',
      email: 'demo3@demo.com',
      contrasenya: '$2b$08$xjVeE8VFAB8o0eLTT9ZANeJQp44n/JTqUl/7ZFJdTbOg2qEB8joM6',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
