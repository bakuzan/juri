const jsdom = require('jsdom').jsdom;

class ContentItemFactory {
  constructor(contentItem) {
    this.contentItem = contentItem;
  }
  process(dataItem) {
    this[this.contentItem.host](dataItem);
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
      image: `https://cdn.masterani.me/poster/${dataItem.poster.file}`,
      type: dataItem.type,
      status: dataItem.status,
      episodes: dataItem.episode_count,
      startDate: dataItem.started_airing_date,
      endDate: dataItem.finished_airing_date
    });
  }
  kissanime(dataItem) {
    console.log('kissanime : ', dataItem);
    this.contentItem.initaliseProps({
      id: dataItem.href,
      href: dataItem.href,
      title: dataItem.textContent,
    });
    //<a href="http://kissanime.ru/Anime/Diamond-no-Ace">Diamond no Ace</a>
  }
  gogoanime(dataItem) {
    console.log('gogoanime : ', dataItem);
    /*
    <div id="header_search_autocomplete_item_1" class="list_search_ajax" onfocus="this.hideFocus=true;">
		  <a href="/category/jojo-no-kimyou-na-bouken-diamond-wa-kudakenai" title="JoJo no Kimyou na Bouken: Diamond wa Kudakenai" rel="jojo-no-kimyou-na-bouken-diamond-wa-kudakenai">
        <div class="thumbnail-recent_search" style="background: url('http://images.gogoanime.tv/cover/jojo-no-kimyou-na-bouken-diamond-wa-kudakenai.jpg');"></div>
          JoJo no Kimyou na Bouken: Diamond wa Kudakenai        </a>
    </div>
     */
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
      image: `${urlBase}${image.src.replace(/^\.\//, '')}`,
      versions: this.getVersions(subs)
    });
  }
  hentaigasm(dataItem) {
    console.log('hentaigasm : ', dataItem);
    /*
    <div id="post-1131" class="post-1131 post type-post status-publish format-standard hentry category-victorian-maid-maria-no-houshi tag-blowjob tag-boobjob tag-maids tag-vanilla item cf item-post">


	<div class="thumb">

		<a class="clip-link" data-id="1131" title="Victorian Maid Maria No Houshi 1 Subbed" href="http://hentaigasm.com/victorian-maid-maria-no-houshi-1-subbed/">

			<span class="clip">

				<img src="http://hentaigasm.com/preview/Victorian Maid Maria No Houshi 1 Subbed.jpg" alt="Victorian Maid Maria No Houshi 1 Subbed"><span class="vertical-align"></span>

			</span>



			<span class="overlay"></span>

		</a>

	</div>
		<div class="data">
			<h2 class="title"><a href="http://hentaigasm.com/victorian-maid-maria-no-houshi-1-subbed/" rel="bookmark" title="Permalink to Victorian Maid Maria No Houshi 1 Subbed">Victorian Maid Maria No Houshi 1 Subbed</a></h2>

			<p class="meta">
				<span class="author">Added by <a href="http://hentaigasm.com/author/admin/" title="Posts by admin" rel="author">admin</a></span>
				<span class="time">1 year ago</span>
			</p>

			<p class="stats"><span class="views"><i class="count">806.77K</i> <span class="suffix">Views</span></span><span class="comments"><i class="count">84</i> <span class="suffix">Comments</span></span><span class="dp-post-likes likes"><i class="count" data-pid="1131">516</i> <span class="suffix">Likes</span></span></p>

			<p class="desc">...</p>
		</div>
	</div>
     */
  }
  hentaihaven(dataItem) {
    console.log('hentaihaven : ', dataItem);
    /*
    <div class="brick zoe-grid big-boobs blow-job boob-job creampie exclusive facial lactation maid pov vanilla brick-big"><div class="brick-media effect-zoe" style="height: 245.813px;">
    <span class="text-muted"><div class="hh_ribbons"><a href="http://hentaihaven.org/tag/exclusive/" class="hh_ribbon"><i class="fa fa-lg fa-bolt"></i></a></div> <a class="thumbnail-image" href="http://hentaihaven.org/victorian-maid-maria-no-houshi-episode-1/"> <img width="300" height="169" alt="victorian-maid-maria-no-houshi-episode-1" data-src="http://hentaihaven.org/package/2015/05/HH-Victorian-Maid-Maria-no-Houshi-Episode-1-DVD-7FA0873D.mp4_snapshot_02.27_2015.05.02_17.27.28-512x288.jpg" src="http://hentaihaven.org/package/2015/05/HH-Victorian-Maid-Maria-no-Houshi-Episode-1-DVD-7FA0873D.mp4_snapshot_02.27_2015.05.02_17.27.28-512x288.jpg" class="lazy attachment-medium post-image" style="display: block;">
    <span class="hidden animate_image" data-image="http://hentaihaven.org/package/gif_thumbs/-HH-Victorian-Maid-Maria-no-Houshi--Episode-1-DVD--7FA0873D-.gif"></span><span class="hidden solid_image" data-image="http://hentaihaven.org/package/2015/05/HH-Victorian-Maid-Maria-no-Houshi-Episode-1-DVD-7FA0873D.mp4_snapshot_02.27_2015.05.02_17.27.28-512x288.jpg"></span><span class="hidden animate_video" data-video="http://hentaihaven.org/package/2015/05/VICTORIAN-MAID-MARIA-NO-HOUSHI-–-EPISODE-1.mp4"></span> </a>
    </span></div><div class="oFlyout_bg isRight"><div class="oFlyout"><div class="oFlyoutArrow"></div><div class="flyoutContent clearfix">
    <a href="http://hentaihaven.org/series/victorian-maid-maria-no-houshi/?sort=title" class="series_title">Victorian Maid Maria no Houshi</a><p class="r_year text-muted">2015</p><span class="tags"><a href="http://hentaihaven.org/tag/exclusive/" rel="tag"><i class="fa fa-bolt"></i>Exclusive</a> <a href="http://hentaihaven.org/tag/big-boobs/" rel="tag">Big Boobs</a>, <a href="http://hentaihaven.org/tag/blow-job/" rel="tag">Blow Job</a>, <a href="http://hentaihaven.org/tag/boob-job/" rel="tag">Boob Job</a>, <a href="http://hentaihaven.org/tag/creampie/" rel="tag">Creampie</a>, <a href="http://hentaihaven.org/tag/facial/" rel="tag">Facial</a>, <a href="http://hentaihaven.org/tag/lactation/" rel="tag">Lactation</a>, <a href="http://hentaihaven.org/tag/maid/" rel="tag">Maid</a>, <a href="http://hentaihaven.org/tag/pov/" rel="tag">POV</a>, <a href="http://hentaihaven.org/tag/vanilla/" rel="tag">Vanilla</a></span><p class="description">This is the maid of your fucking dreams. Pun intended. Classy and sultry, Maria can cook, clean, and cock mongle with grace and charm.</p><span class="pull-left text-muted">1 Episode</span></div></div></div><div data-id="2195" class="brick-content"><h3>
    <a class="brick-title" href="http://hentaihaven.org/victorian-maid-maria-no-houshi-episode-1/">Victorian Maid Maria no Houshi – Episode 1</a></h3><div class="social-info" msdwoqm="" hidden="">
    <span>736,636 views</span>
    <span class="fa fa-heart-o"> 2,255</span>
    <span class="fa fa-comment-o"> 37</span></div></div></div>
     */
  }
}

module.exports = ContentItemFactory;
