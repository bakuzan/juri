const ContentItemFactory = require('./content-item-factory');

class ContentItem {
	constructor(url, dataItem) {
		const REGEX_GET_HOST = /((^.*\/\/)|(.*www\d*\.))(?=\w{5,}\.)|\..*$/g;
		this.host = url.replace(REGEX_GET_HOST, '');

		const factory = new ContentItemFactory(this);
		factory.process(dataItem);
	}
	initaliseProps(props) {
		for(let key in props) {
			if (props.hasOwnProperty(key)) {
				this[key] = props[key];
			}
		}
	}
}

module.exports = ContentItem;
