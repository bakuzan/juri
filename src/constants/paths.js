export const paths = {
  build: (path, params) => {
    for(let k in params) {
      if (params.hasOwnProperty(k)) {
        path = path.replace(`:${k}`, params[k]);
      }
    }
    return path;
  },
  base: '/juri/',
  about: 'about',
  query: {
    malSearch: '/mal-search/:type',
    siteSearch: '/site-search/:type/:age'
  }
};
