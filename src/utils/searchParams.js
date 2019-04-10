import constructObjectFromSearchParams from 'ayaka/constructObjectFromSearchParams';

import SearchFilters from 'constants/searchFilters';
import { isTypeAnime, isAgeAdult } from './index';

export function buildSearchParams(values) {
  return Object.keys(values).reduce((p, k, i) => {
    const join = i !== 0 ? '&' : '';
    return `${p}${join}${k}=${values[k]}`;
  }, '?');
}

export function getFilterFlags(location) {
  const { type, age } = constructObjectFromSearchParams(location.search || '');
  const isAnime = isTypeAnime(type);
  const isAdult = isAgeAdult(age);
  return {
    isAnime,
    isAdult,
    type: type || SearchFilters.anime,
    age: age || SearchFilters.allAges
  };
}

const toLowerCase = (value, isLowerCase) =>
  isLowerCase ? value.toLowerCase() : value;

export function getTypeFromBool(isAnime, isLowerCase) {
  const value = isAnime ? SearchFilters.anime : SearchFilters.manga;
  return toLowerCase(value, isLowerCase);
}

export function getAgeFromBool(isAdult, isLowerCase) {
  const value = isAdult ? SearchFilters.adult : SearchFilters.allAges;
  return toLowerCase(value, isLowerCase);
}
