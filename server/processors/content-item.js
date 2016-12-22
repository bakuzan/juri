const ContentItemFactory = require('./content-item-factory');

class ContentItem {
	constructor(url, dataItem) {
		const REGEX_GET_HOST = /(?=^http.*).*(?=\.)/g;

		this.host = url.replace(REGEX_GET_HOST, '');
		console.log('HOST !! ', this.host);
		const factory = new ContentItemFactory(this);
		factory[this.host](dataItem);
	}
	initaliseProps({ id, href, title, image, versions, authour, type, status, episodes, startDate, endDate }) {
		this.id = id;
		this.href = href;
		this.title = title;
		this.image = image;
		this.versions = versions;
		this.authour = authour;
		this.type = type;
		this.status = status;
		this.episodes = episodes;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}

module.exports = ContentItem;
