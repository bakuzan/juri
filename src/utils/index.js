import SearchFilters from '../constants/searchFilters';

const timers = {};
export function debounce(f, t) {
  const key = f.toString();
  clearTimeout(timers[key]);

  timers[key] = setTimeout(() => f(), t);

  return timers[key];
}

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
