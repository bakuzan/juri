export const paths = {
  build: (path, params) => {
    for(let k in params) {
      if (params.hasOwnProperty(k) && k !== 'search') {
        path = path.replace(`:${k}`, params[k]);
      }
    }
    return `${path}?search=${params.search}`;
  },
  base: '/juri/',
  about: 'about',
  query: {
    malSearch: '/api/mal-search/:type',
    contentSearch: '/api/content-search/:type/:age'
  }
};
