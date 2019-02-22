const gql = require('graphql-tag');

const enums = require('./enums');

module.exports = [
  ...enums,
  gql`
    type Query {
      sourcesAll: [Source]
      sources(sourceType: SourceType!, mediaType: MediaType!, isAdult: Boolean!): [Source]

      latest(sourceId: Int!, page: Int): [ContentItem]
      search(sourceId: Int!, search: String!): [ContentItem]
    }

    type Mutation {
        
    }

    type Source {
      id: Int
      name: String
      url: String
      dataType: DataType
      sourceType: SourceType
      mediaType: MediaType
      parser: String
      selector: String
      isAdult: Boolean
    }

    """
    Data from a Source
    """
    type ContentItem {
      id: String
      href: String
      title: String
      image: String

      subtitle?: String
      authour?: String
      versions?: String

      type?: String
      status?: String
      startDate?: String
      endDate?: String
      currentEpisode?: Int
      postedDate?: String
    }
  `
];
