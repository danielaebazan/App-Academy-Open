'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Insects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Constraint 1: name attribute cannot be empty
        unique: true, // Constraint 2: name attribute must be unique
        validate: {
          notEmpty: true, // Validation: Ensure name attribute is not empty
          is: /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/ // Validation: Ensure Title Case
        },
      },
      description: {
        type: Sequelize.STRING,
      },
      territory: {
        type: Sequelize.STRING,
      },
      fact: {
        type: Sequelize.STRING(240), // Constraint 3: fact attribute must have a maximum of 240 characters
      },
      millimeters: {
        type: Sequelize.FLOAT,
        allowNull: false, // Constraint 4: millimeters attribute cannot be empty
        validate: {
          min: 0, // Constraint 5: millimeters should have a minimum value of zero (0)
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Constraint 6: createdAt should have a default value
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Constraint 7: updatedAt should have a default value
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Insects');
  }
};
