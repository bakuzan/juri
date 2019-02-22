module.exports = {
  sources: [
    {
      name: 'masterani',
      url:
        'http://www.masterani.me/api/anime/search?search=:searchString&sb=true',
      dataType: 'json',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: null,
      isAdult: false
    },
    {
      name: 'gogoanime',
      url: 'https://gogoanimes.co/search.html?keyword=:searchString&id=-1',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: '.last_episodes > .items > li',
      isAdult: false
    },
    {
      name: '9anime',
      url: 'https://9anime.to/search?keyword=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: '.film-list > .item',
      isAdult: false
    },
    {
      name: 'mangahasu',
      url:
        'http://mangahasu.se/advanced-search.html?keyword=:searchString&author=&artist=&status=&typeid=',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Manga',
      parser: `() => ({})`,
      selector: '.list_manga > li',
      isAdult: false
    },
    {
      name: 'fanfox',
      url: 'http://fanfox.net/ajax/search.php?term=:searchString',
      dataType: 'json',
      sourceType: 'Search',
      mediaType: 'Manga',
      parser: `() => ({})`,
      selector: null,
      isAdult: false
    },
    {
      name: 'mangadex',
      url: 'https://mangadex.com/?page=search&title=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Manga',
      parser: `() => ({})`,
      selector: '#content table > tbody > tr',
      isAdult: false
    },
    {
      name: 'ohentai',
      url: 'http://ohentai.org/search.php?k=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: '.videolistcontainer > .videobrickwrap > div.videobrick',
      isAdult: true
    },
    {
      name: 'hentaigasm',
      url: 'http://hentaigasm.com/?s=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: '.loop-content > div > .post',
      isAdult: true
    },
    {
      name: 'hentaihaven',
      url: 'http://hentaihaven.org/search/:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: '#brick-wrap > .brick',
      isAdult: true
    },
    {
      name: 'hentaiplay',
      url: 'http://hentaiplay.net/?s=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: '#content > .loop-content .item-post',
      isAdult: true
    },
    {
      name: 'animeholics',
      url: `http://hentai.animeholics.org/wpa-ajx/anm-sch-lst/?q=:searchString&limit=10&timestamp=${Date.now()}`,
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: null,
      isAdult: true
    },
    {
      name: 'hentaihere',
      url: 'http://hentaihere.com/search?s=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Manga',
      parser: `() => ({})`,
      selector: '.scrollable .row > .seriesBlock',
      isAdult: true
    },
    {
      name: 'nhentai',
      url: 'https://nhentai.net/search/?q=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Manga',
      parser: `() => ({})`,
      selector: '.container > .gallery',
      isAdult: true
    },
    {
      name: 'masterani',
      url: 'http://www.masterani.me/api/releases',
      dataType: 'json',
      sourceType: 'Latest',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: null,
      isAdult: false
    },
    {
      name: 'gogoanime',
      url:
        'https://api.watchanime.cc/ajax/page-recent-release.html?type=1&page=:page',
      dataType: 'text',
      sourceType: 'Latest',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: '.last_episodes > .items > li',
      isAdult: false
    },
    {
      name: '9anime',
      url: 'https://www1.9anime.to/updated?page=:page',
      dataType: 'text',
      sourceType: 'Latest',
      mediaType: 'Anime',
      parser: `() => ({})`,
      selector: '.film-list > .item',
      isAdult: false
    },
    {
      name: 'mangahere',
      url: 'http://www.mangahere.cc/latest/:page/',
      dataType: 'text',
      sourceType: 'Latest',
      mediaType: 'Manga',
      parser: `() => ({})`,
      selector: '.manga_updates > dl',
      isAdult: false
    },
    {
      name: 'mangahasu',
      url: 'http://mangahasu.se/latest-releases.html?page=:page',
      dataType: 'text',
      sourceType: 'Latest',
      mediaType: 'Manga',
      parser: `() => ({})`,
      selector: '.list_manga > li',
      isAdult: false
    },
    {
      name: 'fanfox',
      url: 'http://fanfox.net/releases/:page.htm',
      dataType: 'text',
      sourceType: 'Latest',
      mediaType: 'Manga',
      parser: `() => ({})`,
      selector: '#updates > li',
      isAdult: false
    }
  ]
};
