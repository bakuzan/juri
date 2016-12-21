import React, { Component } from 'react';
import * as searchFilters from '../../constants/search-filters';
import { magicNumbers } from '../../constants/magic-numbers';
import './content-item.css';

class ContentItem extends Component {
  constructor(props) {
    super(props);

    this.adult = this.props.isAdult ? searchFilters.IS_ADULT_TRUE : searchFilters.IS_ADULT_FALSE;
    this.type = this.props.isAnime ? searchFilters.IS_ANIME_TRUE : searchFilters.IS_ANIME_FALSE;
  }
  renderAnimeContentItem() {
    return (
      <div>
        <span className="image" style={{backgroundImage: `url(https://cdn.masterani.me/poster/${this.props.content.poster.file})`}} title={`Cover image for ${this.props.content.title}`}></span>
        <div className="content-item-info">
          <a href={`https://masterani.me/${this.type.toLowerCase()}/info/${this.props.content.slug}`} target="_blank">
            {`${this.props.content.title} (${magicNumbers.animeType[this.props.content.type]})`}
          </a>
          <div>
            <span>
              <b>Aired:</b> {`${this.props.content.started_airing_date} to ${this.props.content.finished_airing_date}`}
            </span>
            <br />
            <span>
              <b>Episodes:</b> {this.props.content.episode_count}
            </span>
            <br />
            <span>
              <b>Status:</b> {magicNumbers.animeStatus[this.props.content.status]}
            </span>
          </div>
        </div>
      </div>
    );
  }
  renderMangaContentItem() {
    return (
      <div>
        <span className="image" style={{backgroundImage: `url(http://www.mangafox.com/store/manga/${this.props.content[0]}/cover.jpg)`}} title={`Cover image for ${this.props.content[1]}`}></span>
        <div className="content-item-info">
          <a href={`http://mangafox.me/${this.type.toLowerCase()}/${this.props.content[2]}/`} target="_blank">
            {`${this.props.content[1]} (${this.props.content[4]})`}
          </a>
        </div>
      </div>
    );
  }
  renderAdultAnimeContentItem() {
    return (
      <div>
        <span className="image" style={{backgroundImage: `url(${this.props.content.image}`}} title={`Cover image for ${this.props.content.title}`}></span>
        <div className="content-item-info">
          <a href={`${this.props.content.link}`} target="_blank">
            {`${this.props.content.title} (${this.props.content.versions})`}
          </a>
        </div>
      </div>
    );
  }
  render() {
    let renderFunction;
    if (this.type === searchFilters.IS_ANIME_TRUE) {
      renderFunction = this.adult === searchFilters.IS_ADULT_TRUE ? (this.renderAdultAnimeContentItem) : (this.renderAnimeContentItem);
    } else {
      renderFunction = this.adult === searchFilters.IS_ADULT_TRUE ? (() => {}) : (this.renderMangaContentItem);
    }

    return(
        <li className="content-item">
          { renderFunction() }
        </li>
    );
  }
}

export default ContentItem;
/*
age_rating: "PG-13 - Teens 13 or older"
episode_count: 13
episode_length: 24
finished_airing_date: "2014-09-28"
genres: Array[3]
id: 75
poster: Object
  extension: "jpg"
  file: "75cqJu5xKX.jpg"
  id: "75cqJu5xKX"
  path: "poster/"
  __proto__: Object
score: 3.18
slug: "75-jinsei"
started_airing_date: "2014-07-06"
status: 0
synopsis: "Yuuki Akamatsu, who is in the Kyuumon Gakuen Second News Club, is asked to become the counselor of the club immediately after joining the club by Ayaka Nikaidou, the club leader. Three girls currently give advice to issues sent in by the students: Rino Endou from the science stream, Fumi Kujou from the literary stream, and Ikumi Suzuki from the sports stream. However, the three always have different opinions and cannot get their views to agree, so they just try things out anyway..."
title: "Jinsei"
tvdb_episode: null
tvdb_id: 281252
tvdb_season_id: null
type: 0
wallpaper_id: "75Ur3hhyDg"
wallpaper_offset: 40
youtube_trailer_id: "VQzC-oal0eQ"

id       - 0: "1193"
title    - 1: "Silver Diamond"
url name - 2: "silver_diamond"
tags     - 3: "Action, Adventure, Comedy, Drama, Fantasy, Mystery, Shoujo, Shounen Ai, Supernatural"
authour  - 4: "Sugiura Shiho"
*/
