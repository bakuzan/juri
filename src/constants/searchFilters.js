const SearchFilters = Object.freeze({
  anime: 'anime',
  manga: 'manga',
  adult: 'adult',
  allAges: 'all ages'
});

export default SearchFilters;

export const mediaTypeText = {
  true: SearchFilters.anime,
  false: SearchFilters.manga
};
export const contentAgeText = {
  true: SearchFilters.adult,
  false: SearchFilters.allAges
};
