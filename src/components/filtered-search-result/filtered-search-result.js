import React, { Component } from 'react';
import SearchBar from '../search-bar/search-bar.js';
import SearchResult from '../search-result/search-result.js';
import * as searchFilters from '../../constants/search-filters';
import { malQuery, contentQuery } from '../../actions/query';

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
    this.isAdultStateName = 'isAdult';
    this.timer = null;

    this.handleUserInput = this.handleUserInput.bind(this);
  }
  handleUserInput(name, value) {
    this.setState({[name]: value});

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.state.searchString.length > 2) {
        const type = this.state.isAnime ? searchFilters.IS_ANIME_TRUE : searchFilters.IS_ANIME_FALSE;
        const age = this.state.isAdult ? searchFilters.IS_ADULT_TRUE : searchFilters.IS_ADULT_FALSE;

        if (name !== this.isAdultStateName) this.fetchMalItems(type);
        this.fetchContentItems(type, age);
      }
    }, 1500);
  }
  fetchContentItems(type, age) {
    contentQuery({ type: type.toLowerCase(), age: age.toLowerCase(), search: this.state.searchString }).then((response) => {
      this.setState({
        contentResults: response
      });
    });
  }
  fetchMalItems(type) {
    malQuery({ type: type.toLowerCase(), search: this.state.searchString }).then((response) => {
      this.setState({
        malResults: response
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
        {
          this.state.searchString.length > 2 &&
          <SearchResult isAdult={this.state.isAdult}
                        isAnime={this.state.isAnime}
                        malResults={this.state.malResults}
                        contentResults={this.state.contentResults} />
        }
      </div>
    );
  }
}

export default FilteredSearchResult;
