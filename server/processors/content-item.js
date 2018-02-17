const ContentItemFactory = require('./content-item-factory');

class ContentItem {
  constructor(url, dataItem) {
    const REGEX_GET_HOST = /(?!^.*\/\/)\w{6,}(?=\..+)|^\.(\w{6,})\./g; // /((^.*\/\/)|(.*www\d*\.))(?=\w{5,}\.)|\..*$/g;
    const hostMatches = url.match(REGEX_GET_HOST) || [
      'NOTHING-MATCHED-GET-HOST-REGEX'
    ];
    this.host = hostMatches[0];

    const factory = new ContentItemFactory(this);
    const isLatest = url.includes('latest');
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
