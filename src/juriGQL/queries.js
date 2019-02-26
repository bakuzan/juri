import gql from 'graphql-tag';

export const getSources = gql`
  query GetSources(
    $sourceType: SourceType
    $mediaType: MediaType
    $isAdult: Boolean
  ) {
    sources(sourceType: $sourceType, mediaType: $mediaType, isAdult: $isAdult) {
      id
      name
      mediaType
      sourceType
      isAdult
      isPaged
    }
  }
`;

export const getContentSearch = gql`
  query GetContentSearch($sourceId: Int!, $searchString: String!) {
    search(sourceId: $sourceId, searchString: $searchString) {
      id
      href
      title
      image

      subtitle
      authour
      versions

      type
      status
      startDate
      endDate
    }
  }
`;
