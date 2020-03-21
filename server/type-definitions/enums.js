const gql = require('graphql-tag');

const { mapArrToGraphqlString } = require('../utils');
const { SourceType, MediaType } = require('../constants/enums');

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

module.exports = [
  SourceTypeGQL,
  MediaTypeGQL,
  gql`
    enum RedditSort {
      Relevance
      Hot
      Top
      New
    }

    enum RedditTime {
      Hour
      Day
      Week
      Month
      Year
      All
    }
  `
];
