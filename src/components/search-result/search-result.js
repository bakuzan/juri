import React, { Component } from 'react';
import MalItem from '../mal-item/mal-item';
import './search-result.css';

class SearchResult extends Component {
  render() {
    const myanimelist = this.props.malResults.map((malItem) => {
      return (<MalItem key={malItem.id} content={malItem} isAnime={this.props.isAnime} />);
    });
    const mycontentlist = this.props.contentResults.map((item) => {
      return (<li>{item.title}</li>);
    });
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
*/
    return (
      <div className="search-results">
        {myanimelist.length > 0 ? (
          <ul className="mal-search-result">
          { myanimelist }
          </ul>
        ) : (
          <p>
            Nothing was found for the current search.
          </p>
        )}
        {mycontentlist.length > 0 ? (
          <ul className="content-search-result">
          { mycontentlist }
          </ul>
        ) : (
          <p>
            Nothing was found for the current search.
          </p>
        )}
      </div>
    );
  }
}

export default SearchResult;
