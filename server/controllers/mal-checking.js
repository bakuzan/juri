const fetch = require('node-fetch');
const constants = require('../constants');
const popura = require('popura');
const client = popura(process.env.MAL_USER, process.env.MAL_PASSWORD);

const helperFunctions = {
  cleanText: (text) => {
		return text.toLowerCase().replace(/\W|\d+ *$/g, '');
	},
  removeCompleted: (list) => {
    return list.filter((item) => {
      return item.series_status === undefined || item.series_status !== constants.malStatus.completed;
    });
  }
}

const getAlternateSpellingList = (type) => {
  return new Promise((resolve, reject) => {
    let list = [];
    const url = constants.url.spellingList[type];
    fetch(url).then((response) => { return response.json(); }).then((data) => {
      const series = data.names;
      const length = series.length;
      for(let i = 0; i < length; i++) {
        list.push({ 'series_title': series[i] });
      }
      resolve(list);
    }).catch((err) => {
      reject(err);
    });
  });
}

const getMyanimelist = {
  anime: () => {
    return new Promise((resolve, reject) => {
      let array = [];
      client.getAnimeList().then((response) => {
        array = response.list;
        return getAlternateSpellingList(constants.type.anime);
      }).then((spellings) => {
        resolve(helperFunctions.removeCompleted(array.concat(spellings)));
      }).catch((err) => {
        reject(err);
      });
    });
  },
  manga: () => {
    return new Promise((resolve, reject) => {
      let array = [];
      client.getMangaList().then((response) => {
        array = response.list;
        return getAlternateSpellingList(constants.type.manga);
      }).then((spellings) => {
        resolve(helperFunctions.removeCompleted(array.concat(spellings)));
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

const setMyAnimeListFlag = (type, latestItems) => {
  return new Promise((resolve, reject) => {
    getMyanimelist[type]().then((mylist) => {
      const length = latestItems.length;
      for(let i = 0; i < length; i++) {
        const item = latestItems[i];
        const index = mylist.findIndex(x => helperFunctions.cleanText(x.series_title) === helperFunctions.cleanText(item.title));
        item.isMalItem = index !== -1;
      }
      resolve(latestItems);
    });
  });
}

const malChecking = {
  setMyAnimeListFlag: setMyAnimeListFlag
}

module.exports = malChecking;
