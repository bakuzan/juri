import React, { Component } from 'react';
import SearchBar from '../search-bar/search-bar.js';
import SearchResult from '../search-result/search-result.js';
import {
  getType,
  getAge,
  getSearchStringFromSearchParam,
  getTypeFromSearchParam,
  getAgeFromSearchParam,
  isAnimeType,
  isAdultAge
} from '../../actions/value';
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
      malResults: [],
      searchString: '',
      siteToSearchIndex: 0,
      siteSelectList: [],
      contentLoading: false,
      malLoading: false
    };

    this.timer = null;

    this.handleCheckboxFilter = this.handleCheckboxFilter.bind(this);
    this.handleLoadData = this.handleLoadData.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleResultsCollapse = this.handleResultsCollapse.bind(this);
    this.handleSiteSelect = this.handleSiteSelect.bind(this);
  }
  componentDidMount() {
    contentSiteListQuery().then(response => {
      this.contentSiteList = response;
      const type = getTypeFromSearchParam(this.props.location);
      const age = getAgeFromSearchParam(this.props.location);
      this.setState(
        prev => ({
          searchString: getSearchStringFromSearchParam(this.props.location),
          siteSelectList: this.setSiteSelectList([], type, age)
        }),
        () =>
          this.state.searchString
            ? this.handleLoadData(SEARCH_STATE_NAME)
            : null
      );
    });
  }
  componentWillReceiveProps(nextProps) {
    const typeChanged =
      getTypeFromSearchParam(nextProps.location) !==
      getTypeFromSearchParam(this.props.location);
    const ageChanged =
      getAgeFromSearchParam(nextProps.location) !==
      getAgeFromSearchParam(this.props.location);
    if (typeChanged || ageChanged) {
      const filterName = typeChanged ? ANIME_STATE_NAME : ADULT_STATE_NAME;
      this.handleLoadData(filterName);
    }
  }
  handleCheckboxFilter(name, value) {
    const isTypeChange = name === ANIME_STATE_NAME;
    const isAdultChange = name === ADULT_STATE_NAME;
    const type = isTypeChange
      ? getType(value, true)
      : getTypeFromSearchParam(this.props.location);
    const age = isAdultChange
      ? getAge(value, true)
      : getAgeFromSearchParam(this.props.location);

    this.setState(prev => ({
      siteToSearchIndex: 0,
      siteSelectList: this.setSiteSelectList(prev.siteSelectList, type, age)
    }));
    this.props.history.replace(
      `${this.props.match.url}?type=${type}&age=${age}`
    );
  }
  handleLoadData(changedFilterName) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.state.searchString.length > 2) {
        const type = getTypeFromSearchParam(this.props.location);
        const age = getAgeFromSearchParam(this.props.location);
        let loading = {
          contentLoading: true
        };

        if (changedFilterName !== ADULT_STATE_NAME) {
          this.fetchMalItems(type);
          loading.malLoading = true;
        }
        this.fetchContentItems(type, age);
        this.setState(loading);
      }
    }, 1500);
  }
  handleSiteSelect(siteToSearchIndex) {
    if (this.state.searchString.length > 2) {
      const type = getTypeFromSearchParam(this.props.location);
      const age = getAgeFromSearchParam(this.props.location);
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
    const hasValue = !!value;
    const type = getTypeFromSearchParam(this.props.location);
    const age = getAgeFromSearchParam(this.props.location);
    this.setState(prev => ({
      [name]: value,
      contentResults: hasValue ? prev.contentResults : [],
      malResults: hasValue ? prev.malResults : [],
      siteToSearchIndex: prev.siteToSearchIndex,
      siteSelectList: this.setSiteSelectList(prev.siteSelectList, type, age)
    }));
    this.handleLoadData(SEARCH_STATE_NAME);
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
      this.setState((previousState, props) => ({
        contentResults: noSiteSpecified
          ? response
          : previousState.contentResults.concat(response),
        contentLoading: false
      }));
    });
  }
  fetchMalItems(type) {
    malQuery({ type: type, search: this.state.searchString }).then(response =>
      this.setState({ malResults: response, malLoading: false })
    );
  }
  render() {
    const isAnime = isAnimeType(getTypeFromSearchParam(this.props.location));
    const isAdult = isAdultAge(getAgeFromSearchParam(this.props.location));
    return (
      <div className="filtered-search-result">
        <SearchBar
          searchString={this.state.searchString}
          isAdult={isAdult}
          isAnime={isAnime}
          onUserInput={this.handleUserInput}
          onCheckboxChange={this.handleCheckboxFilter}
          selectedSiteIndex={this.state.siteToSearchIndex}
          siteSelectList={this.state.siteSelectList}
          onSiteSelect={this.handleSiteSelect}
        />
        {this.state.searchString.length > 2 && (
          <SearchResult
            isAdult={isAdult}
            isAnime={isAnime}
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
