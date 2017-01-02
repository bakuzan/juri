const constants = require('../constants');
const popura = require('popura');
const client = popura(process.env.MAL_USER, process.env.MAL_PASSWORD);

const helperFunctions = {
  cleanText: (text) => {
		return text.toLowerCase().replace(/\W|\d+ *$/g, '');
	}
}

const getAlternateSpellingList = (type) => {
  let list = [];
  const url = constants.urls.spellingList[type];
  fetch(url).then((response) => {
    const data = JSON.parse(response.responseText);
    const series = data.names;
    const length = series.length;
    for(let i = 0; i < length; i++) {
      list.push({ 'series_title': helperFunctions.cleanText(series[i]) });
    }
  });
}

const getMyanimelist = {
  anime: () => {
    return client.getAnimeList().then((response) => {
      console.log('mal : ', response.list.length);
      return response.list.concat(getAlternateSpellingList(type));
    }).catch((err) => {
      return err;
    });
  },
  manga: () => {
    return client.getMangaList().then((response) => {
      return response.list.concat(getAlternateSpellingList(type));
    }).catch((err) => {
      return err;
    });
  }
}

const setMyAnimeListFlag = (type, latestItems) => {
  getMyanimelist[type]().then((mylist) => {
    console.log('mylist : ', mylist.length);
    const length = latestItems.length;
    for(let i = 0; i < length; i++) {
      const item = latestItems[i];
      const index = mylist.findIndex(x => helperFunctions.cleanText(x.series_title) === item.title);
      item.isMalItem = index !== -1;
    }
  });
}

const malChecking = {
  setMyAnimeListFlag: setMyAnimeListFlag
}

module.exports = malChecking;
