const { SourceDataType, SourceType, MediaType } = require('../constants/enums');

module.exports = (db, Types) => {
  return db.define('source', {
    name: {
      type: Types.STRING,
      allowNull: false
    },
    url: {
      type: Types.STRING,
      allowNull: false
    },
    dataType: {
      type: Types.ENUM,
      values: [...SourceDataType]
    },
    sourceType: {
      type: Types.ENUM,
      values: [...SourceType]
    },
    mediaType: {
      type: Types.ENUM,
      values: [...MediaType]
    },
    parser: {
      type: Types.STRING,
      allowNull: false
    },
    selector: {
      type: Types.STRING,
      allowNull: true
    },
    isAdult: {
      type: Types.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};
