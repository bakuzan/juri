import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useContext } from 'react';

import NewTabLink from 'components/NewTabLink';
import SendSelectedDataToSave from 'components/SendSelectedDataToSave';

import MagicNumbers from 'constants/magicNumbers';
import Paths from 'constants/paths';
import { SearchContext } from 'context';
import { padNumber } from 'utils';

import './ContentItem.scss';

// TODO clean up styles!! use themes now!
function ContentItem({ className, content, isLatest }) {
  const searchParams = useContext(SearchContext);
  const hasSearchParams = !!searchParams;

  const info =
    content.authour ||
    content.versions ||
    MagicNumbers.animeType[content.type] ||
    null;
  const additionalInformation = info ? `(${info})` : '';

  return (
    <li
      className={classNames('content-item', className, {
        'content-item__latest': isLatest
      })}
    >
      <div>
        <span
          className="content-item__image"
          style={{ backgroundImage: `url("${Paths.images.deadImage}")` }}
        >
          <span
            className="content-item__image"
            style={{
              backgroundImage: `url("${unescape(content.image)}")`
            }}
            aria-label={`Cover image for ${content.title}`}
          />
        </span>
        <div className="content-item__info">
          <NewTabLink className="content-item__link" to={`${content.href}`}>
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
          {hasSearchParams && (
            <SendSelectedDataToSave {...searchParams} selectedItem={content} />
          )}
        </div>
      </div>
    </li>
  );
}

ContentItem.propTypes = {
  isLatest: PropTypes.bool,
  content: PropTypes.object.isRequired
};

export default ContentItem;
