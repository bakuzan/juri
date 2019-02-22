const gql = require('graphql-tag');

const enums = require('./enums');

module.exports = [
  ...enums,
  gql`
    type Query {
        sourcesAll: [Sources]
        sources(sourceType: SourceType!, mediaType: MediaType!, isAdult: Boolean!): [Sources]

        latest(sourceId: Int!, page: Int): [LatestItem]
        search(sourceId: Int!, search: String!): [SearchItem]
    }
    type Mutation {
        
    }

    type Sources {
        name: String
        url: String
        dataType: DataType
        sourceType: SourceType
        mediaType: MediaType
        selectors: JSON
        paging: String
        isAdult: Boolean
    }

    """
    Data from a Latest source
    """
    type LatestItem {

    }

    """
    Data from a Search source
    """
    type SearchItem {

    }
  `
];
