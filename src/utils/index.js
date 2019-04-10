import SearchFilters from '../constants/searchFilters';

export { capitalise, capitaliseEachWord } from 'ayaka/capitalise';
export { default as debounce } from './debounce';
export { default as generateUniqueId } from './generateUniqueId';
export { default as isString } from './isString';
export { default as padNumber } from './padNumber';

const checkStringMatch = (cstr, fallback) => (str = fallback) =>
  str.toLowerCase() === cstr.toLowerCase();

export const isTypeAnime = checkStringMatch(
  SearchFilters.anime,
  SearchFilters.anime
);
export const isAgeAdult = checkStringMatch(
  SearchFilters.adult,
  SearchFilters.allAges
);

export function mapEnumToSelectOption(obj, displayFn) {
  return Object.keys(obj).map((k) => {
    const value = obj[k];
    return { value, text: displayFn ? displayFn(value) : value };
  });
}
