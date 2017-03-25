const chalk = require('chalk');
const fetch = require('node-fetch');
const constants = require('../constants');
const popura = require('popura');
const client = popura(process.env.MAL_USER, process.env.MAL_PASSWORD);
const cacheModel = {
  time: null,
  anime: [],
  manga: []
};
let cache = Object.assign({}, cacheModel);

const helperFunctions = {
	cleanText: (text) => {
	  return text.toLowerCase().replace(/\W|\d+\.*\d* *$/gm, '');
	},
	processText: {
		anime: (text) => {
		  return helperFunctions.cleanText(text);
		},
		manga: (text) => {
			const index = text.indexOf('(');
			if (index > -1) {
			  text = text.substring(0, index);
			}
			return helperFunctions.cleanText(text);
		}
	},
	removeCompleted: (list) => {
	  return list.filter((item) => {
			return item.my_status === undefined || item.my_status === constants.malStatus.onHold || item.my_status === constants.malStatus.ongoing;
	  });
	},
	assignCacheState: () => {
		if (!cache.time) return cache;
		const timeNow = Date.now();
		const diff = timeNow - cache.time;
		if (diff < (constants.time.oneHour * 3)) return cache;
    console.log(chalk.red('Clearing cache!'));
		return Object.assign({}, cacheModel);
	},
	setCacheTime: () => {
		const time = cache.time || Date.now();
    console.log(chalk.green(`Items cached at ${new Date(time).toISOString()}`));
    return time;
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
    if (cache.anime.length) return Promise.resolve(cache.anime);

    return new Promise((resolve, reject) => {
      let array = [];
      client.getAnimeList().then((response) => {
        array = response.list;
        return getAlternateSpellingList(constants.type.anime);
      }).then((spellings) => {
        const anime = helperFunctions.removeCompleted(array.concat(spellings));
        cache.anime = anime;
				cache.time = helperFunctions.setCacheTime();
        resolve(anime);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  manga: () => {
    if (cache.manga.length) return Promise.resolve(cache.manga);

    return new Promise((resolve, reject) => {
      let array = [];
      client.getMangaList().then((response) => {
        array = response.list;
        return getAlternateSpellingList(constants.type.manga);
      }).then((spellings) => {
        const manga = helperFunctions.removeCompleted(array.concat(spellings));
        cache.manga = manga;
				cache.time = helperFunctions.setCacheTime();
        resolve(manga);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

const setMyAnimeListFlag = (type, latestItems) => {
	cache = helperFunctions.assignCacheState();
  return new Promise((resolve, reject) => {
    getMyanimelist[type]().then((mylist) => {
      console.log(`my ${type} list returned with ${mylist.length} items`);
      const length = latestItems.length;
      for(let i = 0; i < length; i++) {
        const item = latestItems[i];
        const index = mylist.findIndex(x => helperFunctions.cleanText(x.series_title) === helperFunctions.processText[type](item.title));
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
