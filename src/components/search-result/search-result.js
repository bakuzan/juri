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
    let mycontentlist = [];
    let lastHost = '';
    this.props.contentResults.forEach((contentItem) => {
      if (contentItem.host !== lastHost) {
        mycontentlist.push(<li className="content-item host">{contentItem.host}</li>);
      }
      lastHost = contentItem.host;
      mycontentlist.push(<ContentItem key={contentItem.id} content={contentItem}
                                      isAnime={this.props.isAnime}
                                      isAdult={this.props.isAdult} />);
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
