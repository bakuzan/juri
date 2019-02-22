const { enumArrayToObject } = require('../utils');

const MediaType = Object.freeze(['Anime', 'Manga']);

const SourceDataType = Object.freeze(['text', 'json']);

const SourceType = Object.freeze(['Search', 'Latest']);

module.exports = {
  MediaType,
  SourceDataType,
  SourceDataTypes: enumArrayToObject(SourceDataType),
  SourceType
};
