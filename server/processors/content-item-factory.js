const jsdom = require('jsdom').jsdom;

class ContentItemFactory {
  constructor(contentItem) {
    this.contentItem = contentItem;

    this['9anime'] = this._9anime.bind(this);
  }
  process(dataItem, isLatest) {
    console.log(
      `Processing with ${this.contentItem.host}`,
      this[this.contentItem.host]
    );
    this[this.contentItem.host](dataItem, isLatest);
  }
  generateUniqueId() {
    return Math.abs(Date.now() / Math.random() + Math.random());
  }
  getVersions(subTags) {
    let versions = [];
    for (let i = 0, length = subTags.length; i < length; i++) {
      versions.push(subTags[i].textContent);
    }
    return versions.join(', ');
  }
  masterani(dataItem) {
    let href = 'https://masterani.me/anime/info/{0}';
    //Handle latest anime format.
    if (dataItem.anime !== undefined) {
      for (let key in dataItem.anime) {
        if (dataItem.anime.hasOwnProperty(key)) {
          dataItem[key] = dataItem.anime[key];
        }
      }
      href = `https://masterani.me/anime/watch/{0}/${dataItem.episode}`;
    }

    this.contentItem.initaliseProps({
      id: `${dataItem.id}${dataItem.episode || ''}`,
      href: href.replace('{0}', dataItem.slug),
      title: dataItem.title,
      image: `https://cdn.masterani.me/poster/${dataItem.poster.file ||
        dataItem.poster}`,
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
  gogoanime(dataItem, isLatest) {
    const urlBase = 'https://gogoanimes.co';
    const link = dataItem.getElementsByTagName('a')[0];
    const image = dataItem.getElementsByTagName('img')[0];
    if (isLatest) {
      console.log(dataItem);
      const episode = dataItem.getElementsByClassName('episode')[0];
      const suffix = ` - ${episode.textContent}`;

      this.contentItem.initaliseProps({
        id: link.href,
        href: `${urlBase + link.href}`,
        title: `${link.title}${suffix}`,
        image: image.src
      });
    } else {
      const maybeReleaseDate = dataItem.getElementsByClassName('released') || [
        {}
      ];
      const releaseDate = maybeReleaseDate[0];

      this.contentItem.initaliseProps({
        id: link.href,
        href: `${urlBase + link.href}`,
        title: link.title,
        image: image.src,
        startDate:
          releaseDate.textContent &&
          releaseDate.textContent.replace(/[\D]/g, '')
      });
    }
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
  _9anime(dataItem) {
    const links = dataItem.getElementsByTagName('a');
    const link = links[1];
    const image = dataItem.getElementsByTagName('img')[0];
    const maybeEp = dataItem.getElementsByClassName('ep');
    let epText = maybeEp.length && maybeEp[0].textContent;
    epText = ` - ${epText}` ? epText : '';

    this.contentItem.initaliseProps({
      id: link.href,
      href: link.href,
      title: `${link.textContent}${epText}`,
      image: image.src
    });
  }
  fanfox(dataItem) {
    //console.log('fanfox : ', dataItem, typeof dataItem);
    if (Array.isArray(dataItem)) {
      this.contentItem.initaliseProps({
        id: dataItem[0],
        href: `http://fanfox.net/manga/${dataItem[2]}/`,
        title: dataItem[1],
        image: `http://s.fanfox.net/store/manga/${
          dataItem[0]
        }/cover.jpg?v=${Date.now()}`,
        authour: dataItem[4]
      });
    } else {
      const links = dataItem.getElementsByTagName('a');
      const id = links[0].getAttribute('rel');
      const dataLink = links[1];

      this.contentItem.initaliseProps({
        id: `mf-${id}`,
        href: dataLink.href,
        title: dataLink.textContent,
        image: `http://s.fanfox.net/store/manga/${id}/cover.jpg?v=${Date.now()}`
      });
    }
    /*
    <li>
      <div>
        <h3 class="title">
          <a href="http://fanfox.me/manga/chokotto_hime/" rel="5348" class="series_preview manga_open" data-vivaldi-spatnav-clickable="1">Chokotto Hime</a>
        </h3>
        <dl>
          <dt>
            <em>Today</em>
            <span class="chapter nowrap">
              <a href="http://fanfox.me/manga/chokotto_hime/v02/c022/1.html" class="chapter">Chokotto Hime 22</a>
              v02
            </span>
          </dt>
        </dl>
      </div>
    </li>
     */
  }
  mangadex(dataItem) {
    const links = dataItem.getElementsByTagName('a');
    const link = links[0];
    const authour = links[1].textContent;

    this.contentItem.initaliseProps({
      id: this.generateUniqueId(),
      href: `https://mangadex.com/${link.href}`,
      title: link.textContent,
      authour
    });
  }
  mangapark(dataItem) {
    // console.log('mangapark: ', dataItem);
    this.contentItem.initaliseProps({
      id: dataItem[1],
      href: `http://mangapark.me/manga/${dataItem[1]}`,
      title: dataItem[0],
      image: `http://2.c.mpcdn.net/${dataItem[2]}/38.jpg`,
      authour: dataItem[3]
    });
  }
  mangahere(dataItem) {
    const links = dataItem.getElementsByTagName('a');

    this.contentItem.initaliseProps({
      id: this.generateUniqueId(),
      href: links[1].href,
      title: links[1].textContent
    });
    /*
      <dl>
        <dt>
          <i class="manga_open"></i>
          <a rel="Himouto! Umaru-chan" class="manga_info" href="//www.mangahere.cc/manga/himouto_umaru_chan/" data-vivaldi-spatnav-clickable="1">
            Himouto! Umaru-chan
          </a>
          <span class="time">Today 10:23am</span>
        </dt>
        <dd>
          <a href="//www.mangahere.cc/manga/himouto_umaru_chan/c167/" title="Himouto! Umaru-chan 167">
          Himouto! Umaru-chan 167
          </a>
        </dd>
      </dl>
    */
  }
  mangahasu(dataItem, isLatest) {
    const links = dataItem.getElementsByTagName('a');
    const title = dataItem.getElementsByTagName('h3')[0];
    const chapterText = !isLatest
      ? ''
      : ` ${links[2].textContent.replace(/.*?(?=\d+$)/g, '')}`;
    const image = dataItem.getElementsByTagName('img')[0];

    this.contentItem.initaliseProps({
      id: this.generateUniqueId(),
      href: isLatest ? links[2].href : links[0].href,
      title: `${title.textContent}${chapterText}`,
      image: image.src
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
    const link = dataItem.getElementsByTagName('a')[0];
    const image = dataItem.getElementsByTagName('img')[0];
    const videoType = link.title.replace(/^.*((?=subbed)|(?=raw))/gi, '');

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
  hentaiplay(dataItem) {
    const link = dataItem.getElementsByTagName('a')[3];
    const image = dataItem.getElementsByTagName('img')[0];

    this.contentItem.initaliseProps({
      id: `hp-${dataItem.getAttribute('id')}`,
      href: link.href,
      title: link.textContent,
      image: image.getAttribute('src')
    });
  }
  animeholics(dataItem) {
    // hentai.animeholics.org
    ////console.log('animeholics : ', dataItem);
    this.contentItem.initaliseProps({
      id: `ah-${this.generateUniqueId()}`,
      href: dataItem.url,
      title: dataItem.nme,
      image: dataItem.cvr
    });
  }
  hentaihere(dataItem) {
    //console.log('hentaihere : ', dataItem);
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
    //console.log('nhentai : ', dataItem);
    const link = dataItem.getElementsByTagName('a')[0];
    const image = dataItem.getElementsByTagName('img')[0];
    const textElement = dataItem.getElementsByClassName('caption')[0]
      .textContent;
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
