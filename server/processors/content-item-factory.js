const jsdom = require('jsdom').jsdom;

class ContentItemFactory {
  constructor(contentItem) {
    console.log('new factory: ', contentItem);
    this.contentItem = contentItem;
    this.processors = {
      masterani: this.masterani,
      mangafox: this.mangafox,
      ohentai: this.ohentai,
    };
  }
  process(dataItem) {
    console.log('what this ? ', this.contentItem.host, this.processors[this.contentItem.host]);
    this.processors[this.contentItem.host](dataItem);
  }
  getVersions(subTags) {
	  let versions = [];
	  for(let i = 0, length = subTags.length; i < length; i++) {
	    versions.push(subTags[i].textContent);
	  }
	  return versions.join(', ');
	}
  masterani(dataItem) {
    this.contentItem.initaliseProps({
      id: dataItem.id,
      href: `https://masterani.me/anime/info/${dataItem.slug}`,
      title: dataItem.title,
      image: `https://cdn.masterani.me/poster/${dataItem.file}`,
      type: dataItem.type,
      status: dataItem.status,
      episodes: dataItem.episode_count,
      startDate: dataItem.started_airing_date,
      endDate: dataItem.finished_airing_date
    });
  }
  mangafox(dataItem) {
    this.contentItem.initaliseProps({
      id: dataItem[0],
      href: `http://mangafox.me/manga/${dataItem[2]}/`,
      title: dataItem[1],
      image: `http://www.mangafox.com/store/manga/${dataItem[0]}/cover.jpg`,
      authour: dataItem[4]
    });
  }
  ohentai(dataItem) {
    const urlBase = 'http://ohentai.org/';
    const link = dataItem.getElementsByTagName('a')[1];
    const image = dataItem.getElementsByTagName('img')[0];
    const subs = dataItem.getElementsByClassName('subtag');

    this.contentItem.initaliseProps({
      id: link.href,
      href: `${urlBase}${link.href}`,
      title: link.firstChild.textContent,
      image: `${urlBase}${image.src}`,
      versions: this.getVersions(subs)
    });
  }
}

module.exports = ContentItemFactory;
