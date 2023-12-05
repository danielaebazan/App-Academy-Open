'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Insect extends Model {
    static associate(models) {
      // define association here
    }
  }

  Insect.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Constraint 1: name attribute cannot be empty
      unique: true, // Constraint 2: name attribute must be unique
      validate: {
        notEmpty: true, // Validation: Ensure name attribute is not empty
        is: /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/ // Validation: Ensure Title Case
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    territory: {
      type: DataTypes.STRING,
    },
    fact: {
      type: DataTypes.STRING(240), // Constraint 3: fact attribute must have a maximum of 240 characters
    },
    millimeters: {
      type: DataTypes.FLOAT,
      allowNull: false, // Constraint 4: millimeters attribute cannot be empty
      validate: {
        min: 0, // Constraint 5: millimeters should have a minimum value of zero (0)
      },
    },
  }, {
    sequelize,
    modelName: 'Insect',
  });

  return Insect;
};
