export const paths = {
  build: (path, params) => {
    let hasSearch = false;
    for(let k in params) {
      if (params.hasOwnProperty(k)) {
        if (k === 'search') {
          hasSearch = true;
          continue;
        }
        path = path.replace(`:${k}`, params[k]);
      }
    }
    const searchValue = hasSearch ? `?search=${params.search}` : '';
    return `${path}${searchValue}`;
  },
  base: '/juri/',
  about: 'about',
  latest: 'latest',
  query: {
    malSearch: '/api/mal-search/:type',
    contentSearch: '/api/content-search/:site/:type/:age',
    contentLatest: '/api/content-latest/:type',
    contentSiteList: '/api/content-site-list'
  }
};
