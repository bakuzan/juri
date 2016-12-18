const ages = {
  adult: '18+',
  standard: 'standard'
}
const types = {
  anime: 'anime',
  manga: 'manga'
}
const urls = {
  anime: {
    masterani: 'http://www.masterani.me/api/anime/filter?search=:searchString&order=title&page=1'
  },
  manga: {
    mangafox: 'http://mangafox.me/ajax/search.php?term=:searchString'
  }
}

const constants = {
  age: ages,
  type: types,
  url: urls
}

module.exports = constants;
