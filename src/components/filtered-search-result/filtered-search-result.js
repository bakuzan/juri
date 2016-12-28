import React, { Component } from 'react';
import SearchBar from '../search-bar/search-bar.js';
import SearchResult from '../search-result/search-result.js';
import { getType, getAge } from '../../actions/value';
import { malQuery, contentQuery, contentSiteListQuery } from '../../actions/query';

class FilteredSearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentResults: [],
      isAdult: false,
      isAnime: true,
      malResults: [],
      searchString: '',
      siteSelectList: []
    };
    this.isAdultStateName = 'isAdult';
    this.searchStringStateName = 'searchString';
    this.timer = null;

    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleResultsCollapse = this.handleResultsCollapse.bind(this);
    this.handleSiteSelect = this.handleSiteSelect.bind(this);
  }
  componentDidMount() {
    contentSiteListQuery().then((response) => {
      this.contentSiteList = response;
    });
  }
  handleSiteSelect(index) {
    const type = getType(this.state.isAnime, true);
    const age = getAge(this.state.isAdult, true);
    this.fetchContentItems(type, age, index);
  }
  handleResultsCollapse(siteName) {
    const siteSelectList = this.state.siteSelectList.slice();
    const site = siteSelectList.find(x => x.name === siteName);
    site.isCollapsed = !site.isCollapsed;
    this.setState({ siteSelectList: siteSelectList });
  }
  setSiteSelectList(type, age) {
    const siteList = this.contentSiteList ? this.contentSiteList[age][type] : [];
    return siteList.map((site, index) => {
      return { id: index,
               name: site.name,
               isCollapsed: false };
    });
  }
  handleUserInput(name, value) {
    this.setState({[name]: value});

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.state.searchString.length > 2) {
        const type = getType(this.state.isAnime, true);
        const age = getAge(this.state.isAdult, true);

        if (name !== this.isAdultStateName) this.fetchMalItems(type);
        this.fetchContentItems(type, age);
      }
    }, 1500);
  }
  fetchContentItems(type, age, siteIndex = 0) {
    contentQuery({ type: type, age: age, search: this.state.searchString, site: siteIndex }).then((response) => {
      this.setState((previousState, props) => {
        return {
          contentResults: siteIndex === 0 ? response : previousState.contentResults.concat(response),
          siteSelectList: this.setSiteSelectList(type, age)
        };
      });
    });
  }
  fetchMalItems(type) {
    malQuery({ type: type, search: this.state.searchString }).then((response) => {
      this.setState({ malResults: response });
    });
  }
  render() {
    return (
      <div className="filtered-search-result">
        <SearchBar searchString={this.state.searchString}
                   isAdult={this.state.isAdult}
                   isAnime={this.state.isAnime}
                   onUserInput={this.handleUserInput}
                   siteSelectList={this.state.siteSelectList}
                   onSiteSelect={this.handleSiteSelect} />
        {
          this.state.searchString.length > 2 &&
          <SearchResult isAdult={this.state.isAdult}
                        isAnime={this.state.isAnime}
                        malResults={this.state.malResults}
                        contentResults={this.state.contentResults}
                        siteSelectList={this.state.siteSelectList}
                        onSiteCollapse={this.handleResultsCollapse} />
        }
      </div>
    );
  }
}

export default FilteredSearchResult;
