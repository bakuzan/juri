const { DataTypes } = require('sequelize');
const { SourceType, MediaType } = require('../constants/enums');

module.exports = (db) => {
  return db.define('source', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sourceType: {
      type: DataTypes.ENUM,
      values: [...SourceType]
    },
    mediaType: {
      type: DataTypes.ENUM,
      values: [...MediaType]
    },
    optionsParser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    responseParser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    itemParser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdult: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isPaged: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};
