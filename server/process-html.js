const jsdom = require('jsdom').jsdom;

const getVersions = (subTags) => {
  let versions = [];
  for(let i = 0, length = subTags.length; i < length; i++) {
    versions.push(subTags[i].textContent);
  }
  return versions.join(', ');
};

const processHtml = (html, selector, url) => {
  let jsonItems = [];
  const document = jsdom(html);
  const window = document.defaultView;
  const htmlItems = window.document.querySelectorAll(selector);

  for(let i = 0, length = htmlItems.length; i < length; i++) {
    const container = htmlItems[i];
    const link = container.getElementsByTagName('a')[1];
    const image = container.getElementsByTagName('img')[0];
    const subs = container.getElementsByClassName('subtag');

    jsonItems.push({
      id: i,
      href: `http://ohentai.org/${link.href}`,
      title: link.firstChild.textContent,
      image: `http://ohentai.org/${image.src}`,
      versions: getVersions(subs)
    });
  }
  return { data: jsonItems, url: url };
};

module.exports = processHtml;
