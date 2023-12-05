'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Colors', [
      {
        name: 'red'
      },
      {
        name: 'blue'
      },
      {
        name: 'yellow'
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Colors', {
      name: ['red', 'blue', 'yellow'] // Provide the names to be deleted as an array
    });
  }
};

