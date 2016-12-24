import { paths } from '../constants/paths';

const fetchFromServer = (url) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    return response.json();
  });
}

export const malQuery = (params) => {
  const url = paths.build(paths.query.malSearch, params);
  return fetchFromServer(url);
}

export const contentQuery = (params) => {
  const url = paths.build(paths.query.contentSearch, params);
  return fetchFromServer(url);
}

export const contentSiteListQuery = () => {
  return fetchFromServer(paths.query.contentSiteList);
}
