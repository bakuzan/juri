import React from 'react';
import * as searchFilters from '../../constants/search-filters';
import './mal-item.css';

function MalItem(props) {
  const type = props.isAnime ? searchFilters.IS_ANIME_TRUE : searchFilters.IS_ANIME_FALSE;
  return(
    <li className="mal-item">
      <a href={`https://myanimelist.net/${type.toLowerCase()}/${props.content.id}`}>
        {props.content.title}
      </a>
    </li>
  );
}

export default MalItem;
