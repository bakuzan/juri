const gql = require('graphql-tag');

const enums = require('./enums');

module.exports = [
  ...enums,
  gql`
    type Query {
      sourcesManagementInformation: [SourcesManagementResponse]
      sources(
        sourceType: SourceType
        mediaType: MediaType
        isAdult: Boolean
        isActive: Boolean
      ): [Source]
      sourceById(id: Int!): Source

      latest(sourceId: Int!, page: Int): [ContentItem]
      search(sourceId: Int!, searchString: String!): [ContentItem]
    }

    type Mutation {
      sourceCreate(payload: SourceInput!): SourceResponse
      sourceUpdate(payload: SourceInput!): SourceResponse
      sourceRemove(id: Int!): SourceResponse
    }

    type Source {
      id: Int
      name: String
      sourceType: SourceType
      mediaType: MediaType
      optionsParser: String
      responseParser: String
      itemParser: String
      isAdult: Boolean
      isActive: Boolean
      isPaged: Boolean
    }

    input SourceInput {
      id: Int
      name: String
      sourceType: SourceType
      mediaType: MediaType
      optionsParser: String
      responseParser: String
      itemParser: String
      isAdult: Boolean
      isActive: Boolean
      isPaged: Boolean
    }

    """
    Data from a Source
    """
    type ContentItem {
      id: String
      href: String
      title: String
      image: String

      subtitle: String
      authour: String
      versions: String

      type: String
      status: String
      startDate: String
      endDate: String
      currentEpisode: Int
      postedDate: String
    }

    type SourceResponse {
      success: Boolean
      errorMessages: [String]
      data: Source
    }

    type SourcesManagementResponse {
      key: String
      functionSignature: String
      returnObject: String
      availableHelperFunctions: [String]
    }
  `
];
