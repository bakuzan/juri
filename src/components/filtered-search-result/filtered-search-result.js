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
      siteSelectList: [],
      contentLoading: false,
      malLoading: false
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
    this.setState({ contentLoading: true });
  }
  handleResultsCollapse(siteName) {
    const siteSelectList = this.state.siteSelectList.slice();
    const site = siteSelectList.find(x => x.name === siteName);
    site.isCollapsed = !site.isCollapsed;
    this.setState({ siteSelectList: siteSelectList });
  }
  setSiteSelectList(previousList, type, age) {
    const siteList = this.contentSiteList ? this.contentSiteList[age][type] : [];
    return siteList.map((site, index) => {
      let collapsed = false;
      console.log(previousList);
      if (previousList[index] && previousList[index].name === site.name) {
        collapsed = previousList[index].isCollapsed;
      }
      return { id: index,
               name: site.name,
               isCollapsed: collapsed };
    });
  }
  handleUserInput(name, value) {
    this.setState({[name]: value});

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.state.searchString.length > 2) {
        const type = getType(this.state.isAnime, true);
        const age = getAge(this.state.isAdult, true);
        let loading = {
          contentLoading: true
        }

        if (name !== this.isAdultStateName) {
          this.fetchMalItems(type);
          loading.malLoading = true;
        }
        this.fetchContentItems(type, age);
        this.setState(loading);
      }
    }, 1500);
  }
  fetchContentItems(type, age, siteIndex = 0) {
    contentQuery({ type: type, age: age, search: this.state.searchString, site: siteIndex }).then((response) => {
      this.setState((previousState, props) => {
        return {
          contentResults: siteIndex === 0 ? response : previousState.contentResults.concat(response),
          siteSelectList: this.setSiteSelectList(previousState.siteSelectList, type, age),
          contentLoading: false
        };
      });
    });
  }
  fetchMalItems(type) {
    malQuery({ type: type, search: this.state.searchString }).then((response) => {
      this.setState({ malResults: response, malLoading: false });
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
                        malLoading={this.state.malLoading}
                        contentResults={this.state.contentResults}
                        contentLoading={this.state.contentLoading}
                        siteSelectList={this.state.siteSelectList}
                        onSiteCollapse={this.handleResultsCollapse} />
        }
      </div>
    );
  }
}

export default FilteredSearchResult;
