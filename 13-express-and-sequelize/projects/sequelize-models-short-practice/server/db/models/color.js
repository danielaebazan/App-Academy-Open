'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      // define association here
    }
  };

  Color.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Constraint: Disallow NULL values
        unique: true, // Constraint: Enforce uniqueness
      },
    },
    {
      sequelize,
      modelName: 'Color',
    }
  );

  return Color;
};
