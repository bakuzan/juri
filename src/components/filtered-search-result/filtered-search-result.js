import React, { Component } from 'react';
import SearchBar from '../search-bar/search-bar.js';
import SearchResult from '../search-result/search-result.js';
import { getType, getAge } from '../../actions/value';
import {
  malQuery,
  contentQuery,
  contentSiteListQuery
} from '../../actions/query';

const SEARCH_STATE_NAME = 'searchString';
const ANIME_STATE_NAME = 'isAnime';
const ADULT_STATE_NAME = 'isAdult';

class FilteredSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentResults: [],
      isAdult: false,
      isAnime: true,
      malResults: [],
      searchString: '',
      siteToSearchIndex: 0,
      siteSelectList: [],
      contentLoading: false,
      malLoading: false
    };

    this.timer = null;

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleResultsCollapse = this.handleResultsCollapse.bind(this);
    this.handleSiteSelect = this.handleSiteSelect.bind(this);
  }
  componentDidMount() {
    contentSiteListQuery().then(response => {
      this.contentSiteList = response;
      this.setState(prev => {
        const type = getType(prev.isAnime, true);
        const age = getAge(prev.isAdult, true);
        return {
          siteSelectList: this.setSiteSelectList([], type, age)
        };
      });
    });
  }
  handleSiteSelect(siteToSearchIndex) {
    if (this.state.searchString.length > 2) {
      const type = getType(this.state.isAnime, true);
      const age = getAge(this.state.isAdult, true);
      this.fetchContentItems(type, age, siteToSearchIndex);
      this.setState({ contentLoading: true });
    } else {
      this.setState({ siteToSearchIndex });
    }
  }
  handleResultsCollapse(host) {
    const siteSelectList = this.state.siteSelectList.slice();
    const site = siteSelectList.find(x => x.name === host);
    site.isCollapsed = !site.isCollapsed;
    this.setState({ siteSelectList: siteSelectList });
  }
  setSiteSelectList(previousList, type, age) {
    const siteList = this.contentSiteList
      ? this.contentSiteList[age][type]
      : [];
    return siteList.map((site, index) => {
      let collapsed = false;
      if (previousList[index] && previousList[index].name === site.name) {
        collapsed = previousList[index].isCollapsed;
      }
      return {
        id: index,
        alias: site.alias,
        name: site.name,
        isCollapsed: collapsed
      };
    });
  }
  handleUserInput(name, value) {
    const isSearchChange = name === SEARCH_STATE_NAME;
    const isTypeChange = name === ANIME_STATE_NAME;
    const isAdultChange = name === ADULT_STATE_NAME;
    const type = isTypeChange
      ? getType(value, true)
      : getType(this.state.isAnime, true);
    const age = isAdultChange
      ? getAge(value, true)
      : getAge(this.state.isAdult, true);

    this.setState(prev => ({
      [name]: value,
      siteToSearchIndex: isSearchChange ? prev.siteToSearchIndex : 0,
      siteSelectList: this.setSiteSelectList(prev.siteSelectList, type, age)
    }));

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.state.searchString.length > 2) {
        let loading = {
          contentLoading: true
        };

        if (name !== ADULT_STATE_NAME) {
          this.fetchMalItems(type);
          loading.malLoading = true;
        }
        this.fetchContentItems(type, age);
        this.setState(loading);
      }
    }, 1500);
  }
  fetchContentItems(type, age, siteIndex) {
    const noSiteSpecified = isNaN(siteIndex);
    const site = noSiteSpecified ? this.state.siteToSearchIndex : siteIndex;
    contentQuery({
      type: type,
      age: age,
      search: this.state.searchString,
      site
    }).then(response => {
      this.setState((previousState, props) => {
        return {
          contentResults: noSiteSpecified
            ? response
            : previousState.contentResults.concat(response),
          contentLoading: false
        };
      });
    });
  }
  fetchMalItems(type) {
    malQuery({ type: type, search: this.state.searchString }).then(response => {
      this.setState({ malResults: response, malLoading: false });
    });
  }
  render() {
    return (
      <div className="filtered-search-result">
        <SearchBar
          searchString={this.state.searchString}
          isAdult={this.state.isAdult}
          isAnime={this.state.isAnime}
          onUserInput={this.handleUserInput}
          selectedSiteIndex={this.state.siteToSearchIndex}
          siteSelectList={this.state.siteSelectList}
          onSiteSelect={this.handleSiteSelect}
        />
        {this.state.searchString.length > 2 && (
          <SearchResult
            isAdult={this.state.isAdult}
            isAnime={this.state.isAnime}
            malResults={this.state.malResults}
            malLoading={this.state.malLoading}
            contentResults={this.state.contentResults}
            contentLoading={this.state.contentLoading}
            siteSelectList={this.state.siteSelectList}
            onSiteCollapse={this.handleResultsCollapse}
          />
        )}
      </div>
    );
  }
}

export default FilteredSearchResult;
