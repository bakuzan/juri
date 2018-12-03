const ContentItemFactory = require('./content-item-factory');

class ContentItem {
  constructor(url, dataItem, hostName) {
    const urlLower = url.toLowerCase();
    const startWithNumber = url.match(/^\d/) || false;
    this.host = startWithNumber ? `_${hostName}` : hostName;

    const factory = new ContentItemFactory(this);
    const isLatest =
      urlLower.includes('latest') ||
      urlLower.includes('release') ||
      urlLower.includes('updated');

    factory.process(dataItem, isLatest);
  }
  initaliseProps(props) {
    for (let key in props) {
      if (props.hasOwnProperty(key)) {
        this[key] = props[key];
      }
    }
  }
}

module.exports = ContentItem;
