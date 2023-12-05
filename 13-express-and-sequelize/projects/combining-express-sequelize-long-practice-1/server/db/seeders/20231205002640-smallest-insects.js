'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Insects', [
      {
        name: 'Insect 1 Name',
        description: 'Insect 1 Description',
        territory: 'Insect 1 Territory',
        fact: 'Insect 1 Fact',
        millimeters: 1.0, // Replace with actual values for the smallest insect 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // ... (similar entries for other insects)
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Implement the code to delete the seeded insect data
    await queryInterface.bulkDelete('Insects', null, {});
  }
};
