export default {
  build: (path, params) => {
    let hasSearch = false;
    let hasPageNumber = false;
    for (let k in params) {
      if (params.hasOwnProperty(k)) {
        if (k === 'search') {
          hasSearch = true;
          continue;
        }
        if (k === 'page' && params[k]) {
          hasPageNumber = true;
          continue;
        }
        path = path.replace(`:${k}`, params[k]);
      }
    }
    const searchValue = hasSearch ? `?search=${params.search}` : '';
    const pageValue = hasPageNumber ? `?page=${params.page}` : '';
    return `${path}${searchValue}${pageValue}`;
  },
  base: '/juri/',
  about: 'about',
  latest: 'latest',
  manage: 'manage',
  query: {
    malSearch: '/api/mal-search/:type',
    contentSearch: '/api/content-search/:site/:type/:age',
    contentLatest: '/api/content-latest/:site/:type',
    contentSiteList: '/api/content-site-list'
  },
  images: {
    deadImage: 'https://i.imgur.com/gKr1YhF.png'
  }
};
