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
    let href = 'https://masterani.me/anime/info/{0}';
    //Handle latest anime format.
    if (dataItem.anime !== undefined) {
      for(let key in dataItem.anime) {
        if (dataItem.anime.hasOwnProperty(key)) {
          dataItem[key] = dataItem.anime[key];
        }
      }
      href = `https://masterani.me/anime/watch/{0}/${dataItem.episode}`;
    }

    this.contentItem.initaliseProps({
      id: dataItem.id,
      href: href.replace('{0}', dataItem.slug),
      title: dataItem.title,
      image: `https://cdn.masterani.me/poster/${dataItem.poster.file || dataItem.poster}`,
      type: dataItem.type,
      status: dataItem.status,
      episodes: dataItem.episode_count,
      startDate: dataItem.started_airing_date,
      endDate: dataItem.finished_airing_date,
      // latest only
      currentEpisode: dataItem.episode,
      postedDate: dataItem.created_at
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
    const urlBase = 'http://www1.gogoanime.tv';
    const link = dataItem.getElementsByTagName('a')[0];
    const image = dataItem.getElementsByTagName('img')[0];
    const releaseDate = dataItem.getElementsByClassName('released')[0];

    this.contentItem.initaliseProps({
      id: link.href,
      href: `${urlBase + link.href}`,
      title: link.title,
      image: image.src,
      startDate: releaseDate.textContent.replace(/[\D]/g, '')
    });
    /*
    <li>
          <div class="img">
              <a href="/category/diamond-ace" title="Diamond no Ace">
                  <img src="http://images.gogoanime.tv/images/anime/diamond-no-ace.jpg" alt="Diamond no Ace">
              </a>
          </div>
          <p class="name"><a href="/category/diamond-ace" title="Diamond no Ace">Diamond no Ace</a></p>
          <p class="released">
                                                          Released: 2013                                                                            </p>
   </li>
     */
  }
  mangafox(dataItem) {
    console.log('mangafox : ', dataItem);
    const links = dataItem.getElementsByTagName('a');
    const dataLink = links[1];

    this.contentItem.initaliseProps({
      id: dataItem[0],
      href: `http://mangafox.me/manga/${dataItem[2]}/`,
      title: dataItem[1],
      image: `http://www.mangafox.com/store/manga/${dataItem[0]}/cover.jpg`,
      authour: dataItem[4]
    });
    /*
    <li>
      <div>
        <h3 class="title">
          <a href="http://mangafox.me/manga/chokotto_hime/" rel="5348" class="series_preview manga_open" data-vivaldi-spatnav-clickable="1">Chokotto Hime</a>
        </h3>
        <dl>
          <dt>
            <em>Today</em>
            <span class="chapter nowrap">
              <a href="http://mangafox.me/manga/chokotto_hime/v02/c022/1.html" class="chapter">Chokotto Hime 22</a>
              v02
            </span>
          </dt>
        </dl>
      </div>
    </li>
     */
  }
  readmanga(dataItem) {
    console.log('readmanga : ', dataItem);
    const link = dataItem.getElementsByTagName('a')[0];
    const image = dataItem.getElementsByTagName('img')[0];
    const idElement = dataItem.querySelector('a.add_fast_favorite');
    const status = dataItem.querySelector('dl.hot-manga-dl-horizontal > dd');

    this.contentItem.initaliseProps({
      id: `rm-${idElement.getAttribute('data-id')}`,
      href: link.href,
      title: link.textContent,
      image: image.src,
      status: status.textContent
    });
    /*
    <div class="box">
            <div class="title">
                <span class="icon-">1</span>
                <h2><a href="http://www.readmanga.today/diamond-no-ace" title="Diamond no Ace">Diamond no Ace</a></h2>
            </div><!--title-->
            <div class="body">
                <div class="left">

                    <a href="http://www.readmanga.today/diamond-no-ace" title="Diamond no Ace">
                    <img src="http://www.readmanga.today/uploads/posters/thumb/0001_456.jpg" alt="Diamond no Ace" width="134" height="193" /></a>
                </div><!--thumbnail-->

                <div class="right">
                    <div class="summary">
                        <p>It is a manga of high school baseball. The main character, who is a pitcher from a country high school, accidentally gets teamed up with a catcher from a school with an elite baseball team.&#8230;</p>
                    </div>
                    <dl class="hot-manga-dl-horizontal">
                        <dt>Status:</dt>
                        <dd>Ongoing</dd>
                        <dt>Categories:</dt>
                      <dd>                                <a href="http://www.readmanga.today/category/comedy" title="Comedy">Comedy</a>
                                                          <a href="http://www.readmanga.today/category/school-life" title="School Life">School Life</a>
                                                          <a href="http://www.readmanga.today/category/shounen" title="Shounen">Shounen</a>
                                                          <a href="http://www.readmanga.today/category/sports" title="Sports">Sports</a>
                            </dd>
                        <dt>Type :</dt>
                        <dd>Japanese</dd>
                        <dt>Total Views:</dt>
                        <dd>565,098</dd>
                    </dl>
                </div><!--right-->
            </div><!--body-->
            <div class="meta">
                <ul>
                    <li><span class="icon-smiley-2"></span> 15</li>
                    <li><span class="icon-wondering"></span> 0</li>
                    <li><span class="icon-sad-2"></span> 2</li>
                    <li><span class="icon-heart"></span><a href="#" class="add_fast_favorite" data-id="1697"> Add to Favorites</a></li>
                    <li><span class="icon-clock"></span><a href="#" class="add_fast_watch-list" data-id="1697"> Read Later</a></li>

                        <li class="no-effect">
                        <a href="http://www.readmanga.today/service/new_subscription" class="btn btn-xs btn-block btn-google must_member fast-subscribe" data-toggle="modal" data-target="#new_subscription" data-id="1697">&nbsp;<span class="icon-network"></span>&nbsp;&nbsp;Subscribe&nbsp;&nbsp;</a>
                        </li>
                     <li class="no-effect">
                        <a href="http://www.readmanga.today/diamond-no-ace#chapters_container" class="btn btn-xs btn-success"><span class="icon-text"></span> Full Chapter List</a>
                    </li>
                </ul>
            </div><!--meta-->
        </div><!--box-->
     */
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
    const link = dataItem.getElementsByTagName('a')[0];
    const image = dataItem.getElementsByTagName('img')[0];
    const videoType = link.title.replace(/^.*((?=subbed)|(?=raw))/ig, '');

    this.contentItem.initaliseProps({
      id: dataItem.id,
      href: link.href,
      title: link.title,
      image: image.src,
      versions: videoType
    });
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
    const link = dataItem.querySelector('a.brick-title');
    const image = dataItem.getElementsByTagName('img')[0];
    const idElement = dataItem.getElementsByClassName('brick-content')[0];

    this.contentItem.initaliseProps({
      id: `hh-${idElement.getAttribute('data-id')}`,
      href: link.href,
      title: link.textContent,
      image: image.getAttribute('data-src')
    });
    /*
    <div class="brick zoe-grid big-boobs blow-job boob-job creampie exclusive facial lactation maid pov vanilla brick-big">
      <div class="brick-media effect-zoe" style="height: 245.813px;">
      <span class="text-muted">
        <div class="hh_ribbons">
          <a href="http://hentaihaven.org/tag/exclusive/" class="hh_ribbon">
            <i class="fa fa-lg fa-bolt"></i>
          </a>
        </div>
        <a class="thumbnail-image" href="http://hentaihaven.org/victorian-maid-maria-no-houshi-episode-1/">
          <img width="300" height="169" alt="victorian-maid-maria-no-houshi-episode-1" data-src="http://hentaihaven.org/package/2015/05/HH-Victorian-Maid-Maria-no-Houshi-Episode-1-DVD-7FA0873D.mp4_snapshot_02.27_2015.05.02_17.27.28-512x288.jpg" src="http://hentaihaven.org/package/2015/05/HH-Victorian-Maid-Maria-no-Houshi-Episode-1-DVD-7FA0873D.mp4_snapshot_02.27_2015.05.02_17.27.28-512x288.jpg" class="lazy attachment-medium post-image" style="display: block;">
          <span class="hidden animate_image" data-image="http://hentaihaven.org/package/gif_thumbs/-HH-Victorian-Maid-Maria-no-Houshi--Episode-1-DVD--7FA0873D-.gif"></span><span class="hidden solid_image" data-image="http://hentaihaven.org/package/2015/05/HH-Victorian-Maid-Maria-no-Houshi-Episode-1-DVD-7FA0873D.mp4_snapshot_02.27_2015.05.02_17.27.28-512x288.jpg"></span><span class="hidden animate_video" data-video="http://hentaihaven.org/package/2015/05/VICTORIAN-MAID-MARIA-NO-HOUSHI-–-EPISODE-1.mp4"></span> </a>
    </span></div><div class="oFlyout_bg isRight"><div class="oFlyout"><div class="oFlyoutArrow"></div><div class="flyoutContent clearfix">
    <a href="http://hentaihaven.org/series/victorian-maid-maria-no-houshi/?sort=title" class="series_title">Victorian Maid Maria no Houshi</a><p class="r_year text-muted">2015</p><span class="tags"><a href="http://hentaihaven.org/tag/exclusive/" rel="tag"><i class="fa fa-bolt"></i>Exclusive</a> <a href="http://hentaihaven.org/tag/big-boobs/" rel="tag">Big Boobs</a>, <a href="http://hentaihaven.org/tag/blow-job/" rel="tag">Blow Job</a>, <a href="http://hentaihaven.org/tag/boob-job/" rel="tag">Boob Job</a>, <a href="http://hentaihaven.org/tag/creampie/" rel="tag">Creampie</a>, <a href="http://hentaihaven.org/tag/facial/" rel="tag">Facial</a>, <a href="http://hentaihaven.org/tag/lactation/" rel="tag">Lactation</a>, <a href="http://hentaihaven.org/tag/maid/" rel="tag">Maid</a>, <a href="http://hentaihaven.org/tag/pov/" rel="tag">POV</a>, <a href="http://hentaihaven.org/tag/vanilla/" rel="tag">Vanilla</a></span><p class="description">This is the maid of your fucking dreams. Pun intended. Classy and sultry, Maria can cook, clean, and cock mongle with grace and charm.</p><span class="pull-left text-muted">1 Episode</span></div></div></div>
    <div data-id="2195" class="brick-content"><h3>
    <a class="brick-title" href="http://hentaihaven.org/victorian-maid-maria-no-houshi-episode-1/">Victorian Maid Maria no Houshi – Episode 1</a></h3><div class="social-info" msdwoqm="" hidden="">
    <span>736,636 views</span>
    <span class="fa fa-heart-o"> 2,255</span>
    <span class="fa fa-comment-o"> 37</span></div></div></div>
     */
  }
  hentaihere(dataItem) {
    console.log('hentaihere : ', dataItem);
    const link = dataItem.getElementsByTagName('a')[1];
    const image = dataItem.getElementsByTagName('img')[0];
    const authour = dataItem.querySelector('.showMTooltip .text-muted');

    this.contentItem.initaliseProps({
      id: `hh-${link.href.replace(/^.*\//g, '')}`,
      href: link.href,
      title: link.textContent,
      image: image.src,
      authour: authour.textContent.replace('by ', '')
    });
    /*
    <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2-4 seriesBlock" data-tags="15-32-34-41-309-313-339-360-379-530-534-912-952-995-1037-1167-1177-1179-1246-1283-1330-1389-1403-1754-3005-3736" data-mid="6828">
    <div class="item">
    <div class="pos-rlt">
    <div class="item-overlay">
    <div class="center text-center hide m-t-n text-danger">[Blacklisted]</div>
    <div class="center text-center arf-hide m-t-n text-info">[Visited]</div>
    </div>
    <div class="top">
    <div class="text-info padder m-t-sm text-sm pull-left">
    <i class="fa fa-star text-danger fa-lg" id="1"></i><i class="fa fa-star text-danger fa-lg" id="2"></i><i class="fa fa-star text-danger fa-lg" id="3"></i><i class="fa fa-star-o text-danger fa-lg" id="4"></i><i class="fa fa-star-o text-danger fa-lg" id="5"></i> <span class="label label-danger"><i class="fa fa-heart-o"></i> 1</span></div>
    <span class="pull-right m-t-n-xs m-r-sm text-danger bookmark hide">
    <i class="fa fa-bookmark i-lg"></i>
    </span>
    </div>
    <a href="http://hentaihere.com/m/S6828">
    <img src="http://hentaicdn.com/hentai/cover/_S6828.jpg" alt="Big-Sis Lil-Sis Love" class="img-full arf-border-default">
    </a>
    </div>
    <div class="padder-v-top showMTooltip text-center">
    <a href="http://hentaihere.com/m/S6828" class="text-ellipsis text-sm">Big-Sis Lil-Sis Love</a>
    <div class="text-xs text-muted">
    <b class="text-danger">[Original]</b>
    by SHINOBU Tanei.
    </div>
    </div>
    </div>
    </div>
     */
  }
  nhentai(dataItem) {
    console.log('nhentai : ', dataItem);
    const link = dataItem.getElementsByTagName('a')[0];
    const image = dataItem.getElementsByTagName('img')[0];
    const textElement = dataItem.getElementsByClassName('caption')[0].textContent;
    const authour = textElement.replace(/ .*/, '');
    const titles = textElement.replace(/^\[\w*\] /, '').split('|');

    this.contentItem.initaliseProps({
      id: `nh-${link.href.replace(/\//g, '')}`,
      href: `https://nhentai.net${link.href}`,
      title: titles[0],
      subtitle: titles[1],
      image: image.src,
      authour: authour
    });
    /*
        <div class="gallery" data-tags="1207 2937 9260 12227 13720 13989 17249 19018 20035 25050 26360 29013 29859 33173 35762 35763">
          <a href="/g/180622/" class="cover" style="padding-bottom:147.6%;">
            <img src="//t.nhentai.net/galleries/1002302/thumb.jpg">
            <div class="caption">
              [Ozy] Tonari no Yariman Kuro Gal Hitozuma no Midara na Yuuwaku | Obscene Seductions from the Slutty Black Married Gyaru Next Door (COMIC Anthurium 2016-09) [English] =TLL + CW=
            </div>
          </a>
        </div>
     */
  }
}

module.exports = ContentItemFactory;
