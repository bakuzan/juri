import gql from 'graphql-tag';

// Fragments

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

    episodes
    currentEpisode
  }
`;

// Source Queries

export const getSources = gql`
  query GetSources(
    $sourceType: SourceType
    $mediaType: MediaType
    $isAdult: Boolean
  ) {
    sources(
      sourceType: $sourceType
      mediaType: $mediaType
      isAdult: $isAdult
      isActive: true
    ) {
      id
      name
      isPaged
      estimatedSiteUrl
    }
  }
`;

export const getSourcesList = gql`
  query GetSourcesList {
    sources {
      id
      name
      mediaType
      sourceType
      isAdult
      isActive
    }
  }
`;

export const getSourceById = gql`
  query GetSourceById($id: Int!) {
    sourceById(id: $id) {
      id
      name
      sourceType
      mediaType
      optionsParser
      responseParser
      itemParser
      isPaged
      isAdult
      isActive
    }
  }
`;

export const getSourcesManagement = gql`
  query GetSourcesManagement {
    sourcesManagementInformation {
      key
      functionSignature
      returnObject
      availableHelperFunctions
    }
  }
`;

// Content Queries

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

// Reddit

export const getMangaPosts = gql`
  query GetRMangaDiscussions($sort: RedditSort!, $time: RedditTime) {
    posts: rManga(sort: $sort, time: $time) {
      id
      title
      image {
        src
        height
        width
      }
      name
      url
    }
  }
`;
