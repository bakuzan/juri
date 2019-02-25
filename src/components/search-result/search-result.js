import React, { Component } from 'react';
import LoadingSpinner from '../loading-spinner/loading-spinner';

import ContentItem from '../content-item/content-item';
import './search-result.scss';

class SearchResult extends Component {
  collapseResults(siteName) {
    this.props.onSiteCollapse(siteName);
  }

  renderResult(isLoading, resultList) {
    return isLoading ? (
      <LoadingSpinner size="" />
    ) : resultList.length ? (
      resultList
    ) : (
      this.renderEmptyListMessage()
    );
  }

  renderEmptyListMessage() {
    return (
      <li>
        <p>Nothing was found for the current search.</p>
      </li>
    );
  }

  render() {
    const { selectedItem } = this.props;

    let mycontentlist = [];
    let lastHost = '';
    if (this.props.contentResults.forEach !== undefined) {
      this.props.contentResults.forEach((contentItem) => {
        if (contentItem.host !== lastHost) {
          mycontentlist.push(
            <li
              key={contentItem.host}
              className="content-item host"
              onClick={() => this.collapseResults(contentItem.host)}
            >
              {contentItem.host}
            </li>
          );
        }

        lastHost = contentItem.host;
        const site = this.props.siteSelectList.find((x) => x.name === lastHost);
        if (site && !site.isCollapsed) {
          mycontentlist.push(
            <ContentItem
              key={contentItem.id}
              content={contentItem}
              isAnime={this.props.isAnime}
              isAdult={this.props.isAdult}
              isSelected={selectedItem && selectedItem.id === contentItem.id}
              onClick={this.props.selectionActions.selectContentItem}
            />
          );
        }
      });
    }

    const contentSearchResults = this.renderResult(
      this.props.contentLoading,
      mycontentlist
    );

    return (
      <div className="search-results">
        <ul className="content-search-result">{contentSearchResults}</ul>
      </div>
    );
  }
}

export default SearchResult;
