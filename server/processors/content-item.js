const jsdom = require('jsdom').jsdom;

class ContentItem {
	constructor(url, dataItem) {
		const REGEX_GET_HOST = /([w]{3}(\d*)([.]))|(([.])\w{2,}$)/g;
		
		this.host = url.replace(REGEX_GET_HOST, '');
		this.processor[host](dataItem);
	}
	initaliseProps({ id, href, title, image, versions }) {
		this.id = id;
		this.href = href;
		this.title = title;
		this.image = image;
		this.versions = versions;
	}
	processor: {
		ohentai: (dataItem) => {
			const urlBase = 'http://ohentai.org/';
			const link = dataItem.getElementsByTagName('a')[1];
			const image = dataItem.getElementsByTagName('img')[0];
			const subs = dataItem.getElementsByClassName('subtag');
			
			this.initaliseProps({
			  id: i,
			  href: `${urlBase}${link.href}`,
			  title: link.firstChild.textContent,
			  image: `${urlBase}${image.src}`,
			  versions: getVersions(subs)
			});
		}
	}
}

module.exports = ContentItem;
