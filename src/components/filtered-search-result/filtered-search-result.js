import React, { Component } from 'react';
import SearchBar from '../search-bar/search-bar.js';
import SearchResult from '../search-result/search-result.js';
import * as searchFilters from '../../constants/search-filters';
import { paths } from '../../constants/paths';

class FilteredSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentResults: [],
      isAdult: false,
      isAnime: true,
      malResults: [],
      searchString: ''
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }
  handleUserInput(name, value) {
    console.log(name);
    this.setState({[name]: value});
    if (name === 'searchString' && this.state.searchString.length > 2) this.fetchMalItems();
  }
  fetchMalItems() {
    const type = this.state.isAnime ? searchFilters.IS_ANIME_TRUE : searchFilters.IS_ANIME_FALSE;
    fetch(paths.build(paths.query.malSearch, { type: type.toLowerCase() }), {
      method: 'GET',
      headers: {
        'Accept': 'application/xml',
        'Content-Type': 'application/xml'
      }
    }).then((data) => {
      console.log('mal search: ', data);
    });
  }
  render() {
    return (
      <div className="filtered-search-result">
        <SearchBar searchString={this.state.searchString}
                   isAdult={this.state.isAdult}
                   isAnime={this.state.isAnime}
                   onUserInput={this.handleUserInput} />
        <SearchResult searchString={this.state.searchString}
                      isAdult={this.state.isAdult}
                      isAnime={this.state.isAnime}
                      malResults={this.state.malResults}
                      contentResults={this.state.contentResults} />
      </div>
    );
  }
}

export default FilteredSearchResult;
