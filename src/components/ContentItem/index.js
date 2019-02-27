import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import NewTabLink from 'components/NewTabLink';

import MagicNumbers from 'constants/magicNumbers';
import Paths from 'constants/paths';
import { padNumber } from 'utils';

import './ContentItem.scss';

function ContentItem({ className, content, onClick, isSelected }) {
  const canClick = !!onClick;
  const handleClick = canClick ? () => onClick(content) : null;

  const info =
    content.authour ||
    content.versions ||
    MagicNumbers.animeType[content.type] ||
    null;
  const additionalInformation = info ? `(${info})` : '';

  return (
    <li
      className={classNames(
        'content-item',
        { clickable: canClick, selected: isSelected },
        className
      )}
      role={canClick ? 'button' : null}
      tabIndex={canClick ? 0 : null}
      onClick={handleClick}
    >
      <div>
        <span
          className="image"
          style={{ backgroundImage: `url("${Paths.images.deadImage}")` }}
        >
          <span
            className="image"
            style={{
              backgroundImage: `url("${unescape(content.image)}")`
            }}
            title={`Cover image for ${content.title}`}
          />
        </span>
        <div className="content-item-info">
          <NewTabLink
            href={`${content.href}`}
            onClick={(e) => e.stopPropagation()}
          >
            {`${content.title} ${additionalInformation}\n
               ${content.subtitle || ''}`}
          </NewTabLink>
          <div>
            {!!content.startDate && (
              <span>
                <b>Aired:</b> {content.startDate}
                {!!content.endDate && <span> to {content.endDate} </span>}
                <br />
              </span>
            )}
            {!!content.postedDate && (
              <span>
                <b>Posted at:</b> {content.postedDate}
                <br />
              </span>
            )}
            {!!content.episodes && (
              <span>
                <b>Episodes:</b> {content.episodes}
                <br />
              </span>
            )}
            {!!content.currentEpisode && (
              <span>
                <b>Episode #</b>
                {padNumber(content.currentEpisode, 3)}
                <br />
              </span>
            )}
            {!!content.status && (
              <span>
                <b>Status:</b> {MagicNumbers.animeStatus[content.status]}
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

ContentItem.propTypes = {
  content: PropTypes.object.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
};

export default ContentItem;
