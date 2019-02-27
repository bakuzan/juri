import gql from 'graphql-tag';

const contentFragment = gql`
  fragment Fields on ContentItem {
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
`;

export const getSources = gql`
  query GetSources(
    $sourceType: SourceType
    $mediaType: MediaType
    $isAdult: Boolean
  ) {
    sources(sourceType: $sourceType, mediaType: $mediaType, isAdult: $isAdult) {
      id
      name
      isPaged
    }
  }
`;

export const getContentSearch = gql`
  query GetContentSearch($sourceId: Int!, $searchString: String!) {
    search(sourceId: $sourceId, searchString: $searchString) {
      ...Fields
    }
  }
  ${contentFragment}
`;

export const getContentLatest = gql`
  query GetContentLatest($sourceId: Int!, $page: Int) {
    latest(sourceId: $sourceId, page: $page) {
      ...Fields
    }
  }
  ${contentFragment}
`;
