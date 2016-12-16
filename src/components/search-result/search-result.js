import React, { Component } from 'react';
import MalItem from '../mal-item/mal-item';
import './search-result.css';

class SearchResult extends Component {
  render() {
    const myanimelist = this.props.malResults.map((malItem) => {
      return (<MalItem key={malItem.id} content={malItem} isAnime={this.props.isAnime} />);
    });
    return (
      <div className="search-results">
        <ul className="mal-search-result">
          { myanimelist }
        </ul>
        <ul className="content-search-result">

        </ul>
      </div>
    );
  }
}

export default SearchResult;
