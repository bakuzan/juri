const ages = {
  adult: '18+',
  standard: 'standard'
}
const types = {
  anime: 'anime',
  manga: 'manga'
}
const urls = {
  favourite: {
    anime: 'http://www.masterani.me/api/anime/filter?search=:searchString&order=title&page=1',
    manga: 'http://mangafox.me/ajax/search.php?term=:searchString'
  },
  anime: {
    // other anime to be searched by name when asked for.
  },
  manga: {
    // other manga to be searched by name when asked for.
  }
}

const constants = {
  age: ages,
  type: types,
  url: urls
}

module.exports = constants;
