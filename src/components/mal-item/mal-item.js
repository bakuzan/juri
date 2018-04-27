import classNames from 'classnames';
import React from 'react';
import NewTabLink from '../../components/new-tab-link';
import * as searchFilters from '../../constants/search-filters';
import { getType } from '../../actions/value';
import { paths } from '../../constants/paths';
import './mal-item.css';

function MalItem(props) {
  const type = getType(props.isAnime, false);
  const canClick = !!props.onClick;
  const onClick = canClick ? () => props.onClick(props.content) : null;
  return (
    <li
      className={classNames('mal-item', {
        clickable: canClick,
        selected: props.isSelected
      })}
      role={canClick ? 'button' : null}
      onClick={onClick}
    >
      <span
        className="image"
        style={{ backgroundImage: `url("${paths.images.deadImage}")` }}
      >
        <span
          className="image"
          style={{ backgroundImage: `url(${props.content.image})` }}
          title={`Cover image for ${props.content.title}`}
        />
      </span>
      <div className="mal-item-info">
        <NewTabLink
          onClick={e => e.stopPropagation()}
          href={`https://myanimelist.net/${type.toLowerCase()}/${
            props.content.id
          }`}
        >
          {`${props.content.title} (${props.content.type})`}
        </NewTabLink>
        <div>
          <span>
            <b>Aired:</b>{' '}
            {`${props.content.start_date} to ${props.content.end_date}`}
          </span>
          <br />
          <span>
            {type === searchFilters.IS_ANIME_TRUE ? (
              <span>
                {' '}
                <b>Episodes:</b> {props.content.episodes}{' '}
              </span>
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
