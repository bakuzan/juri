module.exports = {
  sources: [
    {
      name: 'masterani',
      url:
        'http://www.masterani.me/api/anime/search?search=:searchString&sb=true',
      dataType: 'json',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `
        function masterani(dataItem) {
          const href = 'https://masterani.me/anime/info/{0}';
      
          this.contentItem.initaliseProps({
            id: dataItem.id + dataItem.episode || '',
            href: href.replace('{0}', dataItem.slug),
            title: dataItem.title,
            image: 'https://cdn.masterani.me/poster/' + dataItem.poster.file ||
              dataItem.poster,
            type: dataItem.type,
            status: dataItem.status,
            episodes: dataItem.episode_count,
            startDate: dataItem.started_airing_date,
            endDate: dataItem.finished_airing_date,
          });
        }
      `,
      selector: null,
      isAdult: false
    },
    {
      name: 'gogoanime',
      url: 'https://gogoanimes.co/search.html?keyword=:searchString&id=-1',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `
      function gogoanime(dataItem) {
        const urlBase = 'https://gogoanimes.co';
        const link = dataItem.getElementsByTagName('a')[0];
        const image = dataItem.getElementsByTagName('img')[0];

        const maybeReleaseDate = dataItem.getElementsByClassName('released') || [
          {}
        ];
        const releaseDate = maybeReleaseDate[0];
  
        this.contentItem.initaliseProps({
          id: link.href,
          href: urlBase + link.href,
          title: link.title,
          image: image.src,
          startDate:
            releaseDate.textContent &&
            releaseDate.textContent.replace(/[\D]/g, '')
        });
      }
      `,
      selector: '.last_episodes > .items > li',
      isAdult: false
    },
    {
      name: '9anime',
      url: 'https://9anime.to/search?keyword=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `
      function nineAnime(dataItem) {
        const links = dataItem.getElementsByTagName('a');
        const link = links[1];
        const image = dataItem.getElementsByTagName('img')[0];
        const maybeEp = dataItem.getElementsByClassName('ep');
        let epText = maybeEp.length && maybeEp[0].textContent;
        epText = epText ? ' - ' + epText : '';
    
        this.contentItem.initaliseProps({
          id: link.href,
          href: link.href,
          title: link.textContent + epText,
          image: image.src
        });
      }
      `,
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
      parser: `
      function mangahasu(dataItem, { generateUniqueId }) {
        const links = dataItem.getElementsByTagName('a');
        const title = dataItem.getElementsByTagName('h3')[0];
        const chapterText = '';
        const image = dataItem.getElementsByTagName('img')[0];
    
        this.contentItem.initaliseProps({
          id: generateUniqueId(),
          href: links[0].href,
          title: title.textContent + chapterText,
          image: image.src
        });
      }
      `,
      selector: '.list_manga > li',
      isAdult: false
    },
    {
      name: 'fanfox',
      url: 'http://fanfox.net/ajax/search.php?term=:searchString',
      dataType: 'json',
      sourceType: 'Search',
      mediaType: 'Manga',
      parser: `
      function fanfox(dataItem) {
        if (Array.isArray(dataItem)) {
          this.contentItem.initaliseProps({
            id: dataItem[0],
            href: 'http://fanfox.net/manga/' + dataItem[2] + '/',
            title: dataItem[1],
            image: 'http://s.fanfox.net/store/manga/' + dataItem[0] + '/cover.jpg?v=' + Date.now(),
            authour: dataItem[4]
          });
        } else {
          const links = dataItem.getElementsByTagName('a');
          const id = links[0].getAttribute('rel');
          const dataLink = links[1];
    
          this.contentItem.initaliseProps({
            id: 'mf-' + id,
            href: dataLink.href,
            title: dataLink.textContent,
            image: 'http://s.fanfox.net/store/manga/' + id + '/cover.jpg?v=' + Date.now()
          });
        }
      }
      `,
      selector: null,
      isAdult: false
    },
    {
      name: 'mangadex',
      url: 'https://mangadex.com/?page=search&title=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Manga',
      parser: `
      function mangadex(dataItem, { generateUniqueId }) {
        const links = dataItem.getElementsByTagName('a');
        const link = links[0];
        const authour = links[1].textContent;
    
        this.contentItem.initaliseProps({
          id: generateUniqueId(),
          href: 'https://mangadex.com/' + link.href,
          title: link.textContent,
          authour
        });
      }
      `,
      selector: '#content table > tbody > tr',
      isAdult: false
    },
    {
      name: 'ohentai',
      url: 'http://ohentai.org/search.php?k=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `
      function ohentai(dataItem, { joinTextContent }) {
        const urlBase = 'http://ohentai.org/';
        const link = dataItem.getElementsByTagName('a')[1];
        const image = dataItem.getElementsByTagName('img')[0];
        const subs = dataItem.getElementsByClassName('subtag');
    
        this.contentItem.initaliseProps({
          id: link.href,
          href: urlBase + link.href,
          title: link.firstChild.textContent,
          image: urlBase + image.src.replace(/^\.\//, ''),
          versions: joinTextContent(subs)
        });
      }
      `,
      selector: '.videolistcontainer > .videobrickwrap > div.videobrick',
      isAdult: true
    },
    {
      name: 'hentaigasm',
      url: 'http://hentaigasm.com/?s=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `
      function hentaigasm(dataItem) {
        const link = dataItem.getElementsByTagName('a')[0];
        const image = dataItem.getElementsByTagName('img')[0];
        const videoType = link.title.replace(/^.*((?=subbed)|(?=raw))/gi, '');
    
        this.contentItem.initaliseProps({
          id: dataItem.id,
          href: link.href,
          title: link.title,
          image: image.src,
          versions: videoType
        });
      }
      `,
      selector: '.loop-content > div > .post',
      isAdult: true
    },
    {
      name: 'hentaihaven',
      url: 'http://hentaihaven.org/search/:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `
      function hentaihaven(dataItem) {
        const link = dataItem.querySelector('a.brick-title');
        const image = dataItem.getElementsByTagName('img')[0];
        const idElement = dataItem.getElementsByClassName('brick-content')[0];
    
        this.contentItem.initaliseProps({
          id: 'hh-' + idElement.getAttribute('data-id'),
          href: link.href,
          title: link.textContent,
          image: image.getAttribute('data-src')
        });
      }
      `,
      selector: '#brick-wrap > .brick',
      isAdult: true
    },
    {
      name: 'hentaiplay',
      url: 'http://hentaiplay.net/?s=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `
      function hentaiplay(dataItem) {
        const link = dataItem.getElementsByTagName('a')[3];
        const image = dataItem.getElementsByTagName('img')[0];
    
        this.contentItem.initaliseProps({
          id: 'hp-' + dataItem.getAttribute('id'),
          href: link.href,
          title: link.textContent,
          image: image.getAttribute('src')
        });
      }
      `,
      selector: '#content > .loop-content .item-post',
      isAdult: true
    },
    {
      name: 'animeholics',
      url:
        'http://hentai.animeholics.org/wpa-ajx/anm-sch-lst/?q=:searchString&limit=10&timestamp=:timestamp',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Anime',
      parser: `
      function animeholics(dataItem, { generateUniqueId }) {
        this.contentItem.initaliseProps({
          id: 'ah-' + generateUniqueId(),
          href: dataItem.url,
          title: dataItem.nme,
          image: dataItem.cvr
        });
      }
      `,
      selector: null,
      isAdult: true
    },
    {
      name: 'hentaihere',
      url: 'http://hentaihere.com/search?s=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Manga',
      parser: `
      function hentaihere(dataItem) {
        const link = dataItem.getElementsByTagName('a')[1];
        const image = dataItem.getElementsByTagName('img')[0];
        const authour = dataItem.querySelector('.showMTooltip .text-muted');
    
        this.contentItem.initaliseProps({
          id: 'hh-' + link.href.replace(/^.*\//g, ''),
          href: link.href,
          title: link.textContent,
          image: image.src,
          authour: authour.textContent.replace('by ', '')
        });
      }
      `,
      selector: '.scrollable .row > .seriesBlock',
      isAdult: true
    },
    {
      name: 'nhentai',
      url: 'https://nhentai.net/search/?q=:searchString',
      dataType: 'text',
      sourceType: 'Search',
      mediaType: 'Manga',
      parser: `
      function nhentai(dataItem) {
        const link = dataItem.getElementsByTagName('a')[0];
        const image = dataItem.getElementsByTagName('img')[0];
        const textElement = dataItem.getElementsByClassName('caption')[0]
          .textContent;
        const authour = textElement.replace(/ .*/, '');
        const titles = textElement.replace(/^\[\w*\] /, '').split('|');
    
        this.contentItem.initaliseProps({
          id: "nh-" + link.href.replace(/\//g, ''),
          href: 'https://nhentai.net' + link.href,
          title: titles[0],
          subtitle: titles[1],
          image: image.src,
          authour: authour
        });
      }
      `,
      selector: '.container > .gallery',
      isAdult: true
    },
    {
      name: 'masterani',
      url: 'http://www.masterani.me/api/releases',
      dataType: 'json',
      sourceType: 'Latest',
      mediaType: 'Anime',
      parser: `
      function masterani(dataItem) {
        for (let key in dataItem.anime) {
          if (dataItem.anime.hasOwnProperty(key)) {
            dataItem[key] = dataItem.anime[key];
          }
        }
        const href = 'https://masterani.me/anime/watch/{0}/' + dataItem.episode;
    
        this.contentItem.initaliseProps({
          id: dataItem.id + dataItem.episode || '',
          href: href.replace('{0}', dataItem.slug),
          title: dataItem.title,
          image: 'https://cdn.masterani.me/poster/' + dataItem.poster.file ||
            dataItem.poster,
          type: dataItem.type,
          status: dataItem.status,
          episodes: dataItem.episode_count,
          startDate: dataItem.started_airing_date,
          endDate: dataItem.finished_airing_date,
          currentEpisode: dataItem.episode,
          postedDate: dataItem.created_at
        });
      }
      `,
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
      parser: `
      function gogoanime(dataItem) {
        const urlBase = 'https://gogoanimes.co';
        const link = dataItem.getElementsByTagName('a')[0];
        const image = dataItem.getElementsByTagName('img')[0];

        const episode = dataItem.getElementsByClassName('episode')[0];
        const suffix = ' - ' + episode.textContent;
  
        this.contentItem.initaliseProps({
          id: link.href,
          href: urlBase + link.href,
          title: link.title + suffix,
          image: image.src
        });
      }
      `,
      selector: '.last_episodes > .items > li',
      isAdult: false
    },
    {
      name: '9anime',
      url: 'https://www1.9anime.to/updated?page=:page',
      dataType: 'text',
      sourceType: 'Latest',
      mediaType: 'Anime',
      parser: `
      function nineAnime(dataItem) {
        const links = dataItem.getElementsByTagName('a');
        const link = links[1];
        const image = dataItem.getElementsByTagName('img')[0];
        const maybeEp = dataItem.getElementsByClassName('ep');
        let epText = maybeEp.length && maybeEp[0].textContent;
        epText = epText ? ' - ' + epText : '';
    
        this.contentItem.initaliseProps({
          id: link.href,
          href: link.href,
          title: link.textContent + epText,
          image: image.src
        });
      }
      `,
      selector: '.film-list > .item',
      isAdult: false
    },
    {
      name: 'mangahere',
      url: 'http://www.mangahere.cc/latest/:page/',
      dataType: 'text',
      sourceType: 'Latest',
      mediaType: 'Manga',
      parser: `
      function mangahere(dataItem, { generateUniqueId }) {
        const links = dataItem.getElementsByTagName('a');
    
        this.contentItem.initaliseProps({
          id: generateUniqueId(),
          href: links[1].href,
          title: links[1].textContent
        });
      }`,
      selector: '.manga_updates > dl',
      isAdult: false
    },
    {
      name: 'mangahasu',
      url: 'http://mangahasu.se/latest-releases.html?page=:page',
      dataType: 'text',
      sourceType: 'Latest',
      mediaType: 'Manga',
      parser: `
      function mangahasu(dataItem, { generateUniqueId }) {
        const links = dataItem.getElementsByTagName('a');
        const title = dataItem.getElementsByTagName('h3')[0];
        const chapterText = ' ' + links[2].textContent.replace(/.*?(?=\d+$)/g, '');
        const image = dataItem.getElementsByTagName('img')[0];
    
        this.contentItem.initaliseProps({
          id: generateUniqueId(),
          href: links[2].href,
          title: title.textContent + chapterText,
          image: image.src
        });
      }
      `,
      selector: '.list_manga > li',
      isAdult: false
    },
    {
      name: 'fanfox',
      url: 'http://fanfox.net/releases/:page.htm',
      dataType: 'text',
      sourceType: 'Latest',
      mediaType: 'Manga',
      parser: `
      function fanfox(dataItem) {
        if (Array.isArray(dataItem)) {
          this.contentItem.initaliseProps({
            id: dataItem[0],
            href: 'http://fanfox.net/manga/' + dataItem[2] + '/',
            title: dataItem[1],
            image: 'http://s.fanfox.net/store/manga/' + dataItem[0] + '/cover.jpg?v=' + Date.now(),
            authour: dataItem[4]
          });
        } else {
          const links = dataItem.getElementsByTagName('a');
          const id = links[0].getAttribute('rel');
          const dataLink = links[1];
    
          this.contentItem.initaliseProps({
            id: 'mf-' + id,
            href: dataLink.href,
            title: dataLink.textContent,
            image: 'http://s.fanfox.net/store/manga/' + id + '/cover.jpg?v=' + Date.now()
          });
        }
      }
      `,
      selector: '#updates > li',
      isAdult: false
    }
  ]
};
