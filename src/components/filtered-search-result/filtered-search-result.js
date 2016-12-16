import React, { Component } from 'react';
import SearchBar from '../search-bar/search-bar.js';
import SearchResult from '../search-result/search-result.js';
import * as searchFilters from '../../constants/search-filters';
import { paths } from '../../constants/paths';
import { malQuery } from '../../actions/query';

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
    this.searchStringStateName = 'searchString';

    this.handleUserInput = this.handleUserInput.bind(this);
  }
  handleUserInput(name, value) {
    // set a timeout here to debounce user input
    // ensure that the timeout is reset when further input is recieved.
    this.setState({[name]: value});
    if (name === this.searchStringStateName && this.state.searchString.length > 2) this.fetchMalItems();
  }
  fetchMalItems() {
    const type = this.state.isAnime ? searchFilters.IS_ANIME_TRUE : searchFilters.IS_ANIME_FALSE;
    const url = paths.build(paths.query.malSearch, { type: type.toLowerCase(), search: this.state.searchString });
    malQuery(url).then((data) => {
      this.setState({
        malResults: data
      });
    });
  }
  render() {
    return (
      <div className="filtered-search-result">
        <SearchBar searchString={this.state.searchString}
                   isAdult={this.state.isAdult}
                   isAnime={this.state.isAnime}
                   onUserInput={this.handleUserInput} />
        <SearchResult isAnime={this.state.isAnime}
                      malResults={this.state.malResults}
                      contentResults={this.state.contentResults} />
      </div>
    );
  }
}

export default FilteredSearchResult;
