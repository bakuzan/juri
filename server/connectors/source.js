const { SourceType, MediaType } = require('../constants/enums');

module.exports = (db, Types) => {
  return db.define('source', {
    name: {
      type: Types.STRING,
      allowNull: false
    },
    sourceType: {
      type: Types.ENUM,
      values: [...SourceType]
    },
    mediaType: {
      type: Types.ENUM,
      values: [...MediaType]
    },
    optionsParser: {
      type: Types.STRING,
      allowNull: false
    },
    responseParser: {
      type: Types.STRING,
      allowNull: false
    },
    itemParser: {
      type: Types.STRING,
      allowNull: false
    },
    isAdult: {
      type: Types.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isActive: {
      type: Types.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isPaged: {
      type: Types.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};
