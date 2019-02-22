const gql = require('graphql-tag');

const { mapArrToGraphqlString } = require('../utils');
const { SourceDataType, SourceType, MediaType } = require('../constants/enums');

const SourceDataTypeGQL = gql`
  enum DataType {
    ${mapArrToGraphqlString(SourceDataType)}
  }
`;

const SourceTypeGQL = gql`
  enum SourceType {
    ${mapArrToGraphqlString(SourceType)}
  }
`;

const MediaTypeGQL = gql`
  enum MediaType {
    ${mapArrToGraphqlString(MediaType)}
  }
`;

module.exports = [SourceDataTypeGQL, SourceTypeGQL, MediaTypeGQL];
