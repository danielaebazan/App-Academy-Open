'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Trees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tree: {
        type: Sequelize.STRING,
        allowNull: false, // Constraint 1: tree attribute cannot be empty
        unique: true, // Constraint 2: tree attribute must be unique
      },
      location: {
        type: Sequelize.STRING
      },
      height_ft: {
        type: Sequelize.FLOAT,
        validate: {
          min: 0 // Constraint 3: heightFt should have a minimum value of zero (0)
        }
      },
      ground_circumference_ft: {
        type: Sequelize.FLOAT,
        validate: {
          min: 0 // Constraint 4: groundCircumferenceFt should have a minimum value of zero (0)
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Constraint 5: createdAt should have a default value of the database's CURRENT_TIMESTAMP
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Constraint 6: updatedAt should have a default value of the database's CURRENT_TIMESTAMP
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Trees');
  }
};
