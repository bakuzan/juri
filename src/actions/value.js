import * as searchFilters from '../constants/search-filters';

const toLowerCase = (value, isLowerCase) => {
  return isLowerCase ? value.toLowerCase() : value;
}

export const getType = (isAnime, isLowerCase) => {
  const value = isAnime ? searchFilters.IS_ANIME_TRUE : searchFilters.IS_ANIME_FALSE;
  return toLowerCase(value, isLowerCase);
}

export const getAge = (isAdult, isLowerCase) => {
  const value = isAdult ? searchFilters.IS_ADULT_TRUE : searchFilters.IS_ADULT_FALSE;
  return toLowerCase(value, isLowerCase);
}
