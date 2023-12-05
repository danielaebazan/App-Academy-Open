'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tree extends Model {
    // ... (existing code)

    static associate(models) {
      // define association here
    }
  }

  Tree.init({
    tree: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: DataTypes.STRING,
    },
    height_ft: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0, // Constraint: heightFt should have a minimum value of zero (0)
      },
    },
    ground_circumference_ft: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0, // Constraint: groundCircumferenceFt should have a minimum value of zero (0)
      },
    },
  }, {
    sequelize,
    modelName: 'Tree',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  return Tree;
};
