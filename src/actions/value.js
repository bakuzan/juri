import * as searchFilters from '../constants/search-filters';

const checkStringMatch = cstr => str =>
  str.toLowerCase() === cstr.toLowerCase();
export const isAnimeType = checkStringMatch(searchFilters.IS_ANIME_TRUE);
export const isAdultAge = checkStringMatch(searchFilters.IS_ADULT_TRUE);

const toLowerCase = (value, isLowerCase) => {
  return isLowerCase ? value.toLowerCase() : value;
};

export const getType = (isAnime, isLowerCase) => {
  const value = isAnime
    ? searchFilters.IS_ANIME_TRUE
    : searchFilters.IS_ANIME_FALSE;
  return toLowerCase(value, isLowerCase);
};

export const getAge = (isAdult, isLowerCase) => {
  const value = isAdult
    ? searchFilters.IS_ADULT_TRUE
    : searchFilters.IS_ADULT_FALSE;
  return toLowerCase(value, isLowerCase);
};

const extractSearchParam = (name, searchParam = '') =>
  searchParam
    .slice(1)
    .split('&')
    .reduce((p, c) => (c.includes(`${name}=`) ? c.replace(/^.+=/, '') : p), '');

export const getTypeFromSearchParam = location =>
  location.search && location.search.includes('type=')
    ? extractSearchParam('type', location.search).toLowerCase()
    : toLowerCase(searchFilters.IS_ANIME_TRUE, true);

export const getAgeFromSearchParam = location =>
  location.search && location.search.includes('age=')
    ? extractSearchParam('age', location.search).toLowerCase()
    : toLowerCase(searchFilters.IS_ADULT_FALSE, true);

export const getSearchStringFromSearchParam = location =>
  extractSearchParam('searchString', location.search);
