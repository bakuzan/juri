import React from 'react';
import * as searchFilters from '../../constants/search-filters';
import { getType } from '../../actions/value';
import './mal-item.css';

function MalItem(props) {
  const type = getType(props.isAnime, false);

  return(
    <li className="mal-item">
      <span className="image" style={{backgroundImage: `url(${props.content.image})`}} title={`Cover image for ${props.content.title}`}></span>
      <div className="mal-item-info">
        <a href={`https://myanimelist.net/${type.toLowerCase()}/${props.content.id}`} target="_blank">
          {`${props.content.title} (${props.content.type})`}
        </a>
        <div>
          <span>
            <b>Aired:</b> {`${props.content.start_date} to ${props.content.end_date}`}
          </span>
          <br />
          <span>
            { type === searchFilters.IS_ANIME_TRUE ? (
              <span> <b>Episodes:</b> {props.content.episodes} </span>
            ) : (
              <span>
                <b>Chapters:</b> {props.content.chapters} <br />
                <b>Volumes:</b> {props.content.volumes}
              </span>
            )}
          </span>
          <br />
          <span>
            <b>Status:</b> {props.content.status}
          </span>
        </div>
      </div>
    </li>
  );
}

export default MalItem;
