'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Trees', [
      {
        tree: 'General Sherman',
        location: 'Sequoia National Park',
        height_ft: 274.9,
        ground_circumference_ft: 102.6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // ... (similar entries for other trees)
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Trees', null, {});
  }
};
