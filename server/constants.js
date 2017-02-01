const ages = {
  adult: 'adult',
  standard: 'standard'
}
const types = {
  anime: 'anime',
  manga: 'manga'
}
const malStatus = {
  completed: 2
}
const urls = {
  standard: {
    anime: [
      {
        name: 'masterani',
        url: 'http://www.masterani.me/api/anime/search?search=:searchString&sb=true',
        dataType: 'json'
      },
      {
        name: 'kissanime',
        url: 'http://kissanime.ru/Search/SearchSuggestx', //'http://kissanime.ru/Search/Anime',
        dataType: 'text',
        formData: {
          type: 'Anime',
          keyword: ':searchString'
        },
        options: { method: 'POST', body: null },
        selector: 'table.listing tr > td > a'
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
      },
      {
        name: 'readmanga',
        url: 'http://www.readmanga.today/service/advanced_search',
        dataType: 'text',
        formData: {
          type: 'all',
          'manga-name': ':searchString',
          'author-name': '',
          'artist-name': '',
          status:  'both'
        },
        options: { method: 'POST', body: null },
        selector: '.box'
      },
      {
        name: 'mangapark',
        url: 'http://h.j.mangapark.me/ajax-autocomplete.js?q=:searchString',
        dataType: 'text'
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
      },
      {
        name: 'hentaiplay',
        url: 'http://hentaiplay.net/?s=:searchString',
        dataType: 'text',
        selector: '#content > .loop-content .item-post'
      },
      {
        name: 'animeholics',
        url: `http://hentai.animeholics.org/wpa-ajx/anm-sch-lst/?q=:searchString&limit=10&timestamp=${Date.now()}`,
        dataType: 'text'
      }
    ],
    manga: [
      {
        name: 'hentaihere',
        url: 'http://hentaihere.com/search?s=:searchString',
        dataType: 'text',
        selector: '.scrollable .row > .seriesBlock'
      },
      {
        name: 'nhentai',
        url: 'https://nhentai.net/search/?q=:searchString',
        dataType: 'text',
        selector: '.container > .gallery'
      }
    ]
  },
  latest: {
    anime: [
      {
        name: 'masterani',
        url: 'http://www.masterani.me/api/releases',
        dataType: 'json'
      }
    ],
    manga: [
      {
        name: 'mangafox',
        url: 'http://mangafox.me/releases/',
        dataType: 'text',
        selector: '#updates > li'
      }
    ]
  },
  spellingList: {
    anime: 'https://raw.githubusercontent.com/bakuzan/user-scripts/master/anime-release-highlighter/anime-spellings.json',
    manga: 'https://raw.githubusercontent.com/bakuzan/user-scripts/master/manga-release-checker/manga-spellings.json'
  }
}

const constants = {
  age: ages,
  type: types,
  url: urls,
  malStatus: malStatus
}

module.exports = constants;
