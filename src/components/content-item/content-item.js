import classNames from 'classnames';
import React, { Component } from 'react';
import NewTabLink from 'components/NewTabLink';
import { getType, getAge } from '../../actions/value';
import { magicNumbers } from '../../constants/magic-numbers';
import paths from '../../constants/paths';
import './content-item.scss';

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
            onClick={(e) => e.stopPropagation()}
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
