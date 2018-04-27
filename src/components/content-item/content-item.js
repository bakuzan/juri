import classNames from 'classnames';
import React, { Component } from 'react';
import NewTabLink from '../../components/new-tab-link';
import { getType, getAge } from '../../actions/value';
import { magicNumbers } from '../../constants/magic-numbers';
import { paths } from '../../constants/paths';
import './content-item.css';

class ContentItem extends Component {
  constructor(props) {
    super(props);

    this.content = this.props.content;
    this.adult = getAge(this.props.isAdult, false);
    this.type = getType(this.props.isAnime, false);
  }
  padEpisodeNumber(number) {
    return number <= 999 ? ('00' + number).slice(-3) : number;
  }
  setAdditionalInformation() {
    const info =
      this.content.authour ||
      this.content.versions ||
      magicNumbers.animeType[this.content.type] ||
      null;
    return info ? `(${info})` : '';
  }
  renderContentItem() {
    return (
      <div>
        <span
          className="image"
          style={{ backgroundImage: `url("${paths.images.deadImage}")` }}
        >
          <span
            className="image"
            style={{
              backgroundImage: `url("${unescape(this.content.image)}")`
            }}
            title={`Cover image for ${this.content.title}`}
          />
        </span>
        <div className="content-item-info">
          <NewTabLink
            href={`${this.content.href}`}
            onClick={e => e.stopPropagation()}
          >
            {`${this.content.title} ${this.setAdditionalInformation()}\n
               ${this.content.subtitle || ''}`}
          </NewTabLink>
          <div>
            {this.content.startDate !== undefined && (
              <span>
                <b>Aired:</b> {this.content.startDate}
                {this.content.endDate !== undefined && (
                  <span> to {this.content.endDate} </span>
                )}
                <br />
              </span>
            )}
            {this.content.postedDate !== undefined && (
              <span>
                <b>Posted at:</b> {this.content.postedDate}
                <br />
              </span>
            )}
            {this.content.episodes !== undefined && (
              <span>
                <b>Episodes:</b> {this.content.episodes}
                <br />
              </span>
            )}
            {this.content.currentEpisode !== undefined && (
              <span>
                <b>Episode #</b>
                {this.padEpisodeNumber(this.content.currentEpisode)}
                <br />
              </span>
            )}
            {this.content.status !== undefined && (
              <span>
                <b>Status:</b> {magicNumbers.animeStatus[this.content.status]}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
  render() {
    const canClick = !!this.props.onClick;
    const onClick = canClick
      ? () => this.props.onClick(this.props.content)
      : null;
    return (
      <li
        className={classNames(
          'content-item',
          { clickable: canClick, selected: this.props.isSelected },
          this.props.className
        )}
        role={canClick ? 'button' : null}
        onClick={onClick}
      >
        {this.renderContentItem()}
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
