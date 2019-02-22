module.exports = {
  appName: 'juri',
  whitelist: /^.*localhost:\d{4}/,
  environment: {
    development: 'development',
    production: 'production'
  },
  age: {
    adult: 'adult',
    standard: 'standard'
  },
  type: {
    anime: 'anime',
    manga: 'manga'
  },
  malStatus: {
    ongoing: 1, //watching reading
    completed: 2,
    onHold: 3,
    dropped: 4,
    planTo: 6 //plantowatch plantoread
  },
  time: {
    oneHour: 3600000
  }
};
