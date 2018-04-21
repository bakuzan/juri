import React, { Component } from 'react';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ToggleBox from '../../components/toggle-box/toggle-box.js';
import ContentItem from '../../components/content-item/content-item';
import { getType, getTypeFromSearchParam } from '../../actions/value';
import { contentLatest } from '../../actions/query';

const ANIME = 'anime';

class Latest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      latestResults: [],
      loading: true,
      loadingMore: false
    };

    this.timer = null;
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleDataRefresh = this.handleDataRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  componentDidMount() {
    this.fetchLatest();
  }
  componentDidUpdate(prevProps) {
    const nextType = getTypeFromSearchParam(this.props.location);
    const prevType = getTypeFromSearchParam(prevProps.location);
    if (nextType === prevType) return null;

    this.setState(
      {
        page: 1,
        loading: true
      },
      () => this.fetchLatest()
    );
  }
  handleUserInput(name, value) {
    const type = getType(value, true);
    this.props.history.replace(`${this.props.match.url}?type=${type}`);
  }
  handleDataRefresh() {
    this.setState({ loading: true }, () => this.fetchLatest());
  }
  handleLoadMore() {
    this.setState(
      prev => ({ page: prev.page + 1, loadingMore: true }),
      () => this.fetchLatest(this.state.page)
    );
  }
  fetchLatest(page) {
    const type = getTypeFromSearchParam(this.props.location);
    contentLatest({ type, page }).then(response => {
      this.setState(prev => ({
        latestResults: !page ? response : [...prev.latestResults, ...response],
        loading: false,
        loadingMore: false
      }));
    });
  }
  buildContentList(list) {
    const type = getTypeFromSearchParam(this.props.location);
    return list.map(item => {
      const classes = `latest-item${item.isMalItem ? ' on-my-list' : ''}`;
      return (
        <ContentItem
          key={item.id}
          className={classes}
          content={item}
          isAnime={type === ANIME}
          isAdult={false}
        />
      );
    });
  }
  renderLatestResult(isLoading, resultList) {
    return isLoading ? (
      <LoadingSpinner size="" />
    ) : resultList.length > 0 ? (
      this.buildContentList(resultList)
    ) : (
      <li>
        <p>Nothing was found for the current search.</p>
      </li>
    );
  }
  render() {
    const currentType = getTypeFromSearchParam(this.props.location);
    const latestRenderResult = this.renderLatestResult(
      this.state.loading,
      this.state.latestResults
    );
    const isAnime = currentType === ANIME;

    return (
      <div className="latest">
        <h2 className="center-contents">
          <div className="flex-spacer" />
          Latest releases for
          <ToggleBox
            isChecked={isAnime}
            handleChange={this.handleUserInput}
            name="isAnime"
            text={currentType}
          />
          <div className="flex-spacer" />
          <button
            type="button"
            title="Refresh data"
            icon={'\u21BB'}
            className="button-icon ripple"
            id="refresh-button"
            onClick={this.handleDataRefresh}
          />
        </h2>
        <ul className="latest-content-list">{latestRenderResult}</ul>
        <div>
          {!isAnime &&
            !this.state.loading &&
            !this.state.loadingMore && (
              <button
                type="button"
                className="button primary ripple width-100"
                onClick={this.handleLoadMore}
              >
                Load more...
              </button>
            )}
          {this.state.loadingMore && <LoadingSpinner />}
        </div>
      </div>
    );
  }
}

export default Latest;
