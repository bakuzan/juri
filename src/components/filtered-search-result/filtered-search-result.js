import React, { Component } from 'react';
import SearchBar from '../search-bar/search-bar.js';
import SearchResult from '../search-result/search-result.js';

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
    this.setState({[name]: value});
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
