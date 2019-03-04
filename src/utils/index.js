import SearchFilters from '../constants/searchFilters';

export const isString = (s) => typeof s === 'string';

export const generateUniqueId = () =>
  (`${1e7}` + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (s) => {
    const c = Number(s);
    return (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16);
  });

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

export const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const capitaliseEachWord = (str) =>
  str
    .split(' ')
    .map(capitalise)
    .join(' ');

export function padNumber(n, width, z = '0') {
  n += '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function mapEnumToSelectOption(obj, displayFn) {
  return Object.keys(obj).map((k) => {
    const value = obj[k];
    return { value, text: displayFn ? displayFn(value) : value };
  });
}
