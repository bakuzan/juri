const FormData = require('form-data');

const ages = {
  adult: 'adult',
  standard: 'standard'
}
const types = {
  anime: 'anime',
  manga: 'manga'
}
const urls = {
  standard: {
    anime: [
      {
        name: 'masterani',
        url: 'http://www.masterani.me/api/anime/filter?search=:searchString&order=title&page=1',
        dataType: 'json'
      },
      {
        name: 'kissanime',
        url: 'http://kissanime.ru/Search/SearchSuggestx',
        dataType: 'text',
        options: { method: 'POST', body: 'type=Anime&keyword=:searchString' },
        selector: 'a'
      },
      {
        name: 'gogoanime',
        url: 'http://www1.gogoanime.tv/search.html?keyword=:searchString&id=-1',
        dataType: 'text',
        selector: '.last_episodes > .items > li'
      }
    ],
    manga: [
      {
        name: 'mangafox',
        url: 'http://mangafox.me/ajax/search.php?term=:searchString',
        dataType: 'json'
      }
    ]
  },
  adult: {
    anime: [
      {
        name: 'ohentai',
        url: 'http://ohentai.org/search.php?k=:searchString',
        dataType: 'text',
        selector: '.videolistcontainer > .videobrickwrap > div.videobrick'
      },
      {
        name: 'hentaigasm',
        url: 'http://hentaigasm.com/?s=:searchString',
        dataType: 'text',
        selector: '.loop-content > div > .post'
      },
      {
        name: 'hentaihaven',
        url: 'http://hentaihaven.org/search/:searchString',
        dataType: 'text',
        selector: '#brick-wrap > .brick'
      }
    ],
    manga: [

    ]
  }
}

const constants = {
  age: ages,
  type: types,
  url: urls
}

module.exports = constants;
