const FormData = require('form-data');

const ages = {
  adult: '18+',
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
        url: 'http://www.masterani.me/api/anime/filter?search=:searchString&order=title&page=1'
      },
      {
        name: 'kissanime',
        url: 'http://kissanime.ru/Search/SearchSuggestx',
        postData: (keyword) => {
          const form = new FormData();
          form.append('type', 'anime');
          form.append('keyword', keyword);
          return form;
        },
        options: {
          method: 'POST'
        }
      }
    ],
    manga: [
      {
        name: 'mangafox',
        url: 'http://mangafox.me/ajax/search.php?term=:searchString'
      }
    ]
  },
  adult: {
    anime: [
      {
        name: 'ohentai',
        url: 'http://ohentai.org/search.php?k=:searchString',
        selector: '.videolistcontainer > .videobrickwrap > div.videobrick'
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
