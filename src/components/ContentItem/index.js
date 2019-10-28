import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useContext } from 'react';

import padNumber from 'ayaka/padNumber';
import { Image } from 'mko';
import NewTabLink from 'components/NewTabLink';
import SendSelectedDataToSave from 'components/SendSelectedDataToSave';

import MagicNumbers from 'constants/magicNumbers';
import { SearchContext } from 'context';

import './ContentItem.scss';

function resolveInfo(content) {
  return (
    content.authour ||
    content.versions ||
    MagicNumbers.animeType[content.type] ||
    null
  );
}

function ContentItem({ className, content, isLatest }) {
  const searchParams = useContext(SearchContext);
  const hasSearchParams = !!searchParams;

  const info = resolveInfo(content);
  const additionalInformation = info ? `(${info})` : '';

  return (
    <li
      className={classNames('content-item', className, {
        'content-item--latest': isLatest
      })}
    >
      <div className="content-item__inner">
        <Image
          className="content-item__image"
          src={unescape(content.image)}
          alt={`Cover for ${content.title}`}
          width="58px"
          height="90px"
          isLazy
        />
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
