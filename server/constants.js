const ages = {
  adult: 'adult',
  standard: 'standard'
};
const types = {
  anime: 'anime',
  manga: 'manga'
};
const malStatus = {
  ongoing: 1, //watching reading
  completed: 2,
  onHold: 3,
  dropped: 4,
  planTo: 6 //plantowatch plantoread
};
const urls = {
  standard: {
    anime: [
      {
        name: 'masterani',
        url:
          'http://www.masterani.me/api/anime/search?search=:searchString&sb=true',
        dataType: 'json'
      },
      {
        name: 'gogoanime',
        url: 'http://www1.gogoanime.tv/search.html?keyword=:searchString&id=-1',
        dataType: 'text',
        selector: '.last_episodes > .items > li'
      },
      {
        name: '9anime',
        url: 'https://9anime.is/search?keyword=:searchString',
        dataType: 'text',
        selector: '.film-list > .item'
      }
    ],
    manga: [
      {
        name: 'mangahasu',
        url:
          'http://mangahasu.se/advanced-search.html?keyword=:searchString&author=&artist=&status=&typeid=',
        dataType: 'text',
        selector: '.list_manga > li'
      },
      {
        name: 'fanfox',
        url: 'http://fanfox.net/ajax/search.php?term=:searchString',
        dataType: 'json'
      },
      {
        name: 'mangadex',
        url: 'https://mangadex.com/?page=search&title=:searchString',
        dataType: 'text',
        selector: '#content table > tbody > tr'
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
      },
      {
        name: 'gogoanime',
        url: 'https://api.watchanime.cc/ajax/page-recent-release.html?type=1',
        dataType: 'text',
        selector: '.last_episodes > .items > li',
        paging: '&page=:page'
      },
      {
        name: '9anime',
        url: 'https://www8.9anime.is/updated',
        dataType: 'text',
        selector: '.film-list > .item',
        paging: '?page=:page'
      }
    ],
    manga: [
      {
        name: 'mangahere',
        url: 'http://www.mangahere.cc/latest/',
        dataType: 'text',
        selector: '.manga_updates > dl',
        paging: '/:page/'
      },
      {
        name: 'mangahasu',
        url: 'http://mangahasu.se/latest-releases.html',
        dataType: 'text',
        selector: '.list_manga > li',
        paging: '?page=:page'
      },
      {
        name: 'fanfox',
        url: 'http://fanfox.net/releases/',
        dataType: 'text',
        selector: '#updates > li',
        paging: ':page.htm'
      }
    ]
  },
  spellingList: {
    anime:
      'https://raw.githubusercontent.com/bakuzan/user-scripts/master/anime-release-highlighter/anime-spellings.json',
    manga:
      'https://raw.githubusercontent.com/bakuzan/user-scripts/master/manga-release-checker/manga-spellings.json'
  }
};

const times = {
  oneHour: 3600000
};

const environment = {
  development: 'development',
  production: 'production'
};

const constants = {
  age: ages,
  type: types,
  url: urls,
  malStatus: malStatus,
  time: times,
  environment
};

module.exports = constants;
