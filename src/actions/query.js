import { paths } from '../constants/paths';

export const malQuery = (params) => {
  const url = paths.build(paths.query.malSearch, params);
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

export const contentQuery = (params) => {
  const url = paths.build(paths.query.contentSearch, params);
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
