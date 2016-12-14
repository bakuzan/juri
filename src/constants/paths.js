export const paths = {
  build: (path, params) => {
    for(let k in params) {
      path = path.replace(`:${k}`, params[k]);
    }
    return path;
  },
  base: '/juri/',
  about: 'about',
  query: {
    malSearch: '/api/mal-search/:type',
    siteSearch: '/api/site-search/:type/:age'
  }
};
