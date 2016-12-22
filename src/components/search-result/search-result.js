import React, { Component } from 'react';
import MalItem from '../mal-item/mal-item';
import ContentItem from '../content-item/content-item';
import './search-result.css';

class SearchResult extends Component {
  renderEmptyListMessage() {
    return (
      <li>
        <p>Nothing was found for the current search.</p>
      </li>
    );
  }
  render() {
    console.log('content: ', this.props.contentResults);
    const myanimelist = this.props.malResults.map((malItem) => {
      return (<MalItem key={malItem.id} content={malItem} isAnime={this.props.isAnime} />);
    });
    const mycontentlist = this.props.contentResults.map((contentItem) => {
      return (
        <ContentItem key={contentItem.id || contentItem[0]}
                     content={contentItem}
                     isAnime={this.props.isAnime}
                     isAdult={this.props.isAdult} />
                   );
    });

    return (
      <div className="search-results">
        <ul className="mal-search-result">
        {myanimelist.length > 0 ? (
          myanimelist
        ) : (
          this.renderEmptyListMessage()
        )}
        </ul>
        <ul className="content-search-result">
        {mycontentlist.length > 0 ? (
          mycontentlist
        ) : (
          this.renderEmptyListMessage()
        )}
        </ul>
      </div>
    );
  }
}

export default SearchResult;
