import gql from 'graphql-tag';

export const createSource = gql`
  mutation CreateSource($payload: SourceInput!) {
    sourceCreate(payload: $payload) {
      success
      errorMessages
      data {
        id
      }
    }
  }
`;

export const updateSource = gql`
  mutation UpdateSource($payload: SourceInput!) {
    sourceUpdate(payload: $payload) {
      success
      errorMessages
      data {
        id
      }
    }
  }
`;
