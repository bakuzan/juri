import SearchFilters from '../constants/searchFilters';

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
