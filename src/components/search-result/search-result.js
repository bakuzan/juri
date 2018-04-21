import React, { Component } from 'react';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import MalItem from '../mal-item/mal-item';
import ContentItem from '../content-item/content-item';
import './search-result.css';

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
    const {
      malItem: selectedMalItem,
      contentItem: selectedContentItem
    } = this.props.selectedItems;
    const myanimelist = this.props.malResults.map(malItem => (
      <MalItem
        key={malItem.id}
        content={malItem}
        isAnime={this.props.isAnime}
        isSelected={selectedMalItem && selectedMalItem.id === malItem.id}
        onClick={this.props.selectionActions.selectMalItem}
      />
    ));

    let mycontentlist = [];
    let lastHost = '';
    if (this.props.contentResults.forEach !== undefined) {
      this.props.contentResults.forEach(contentItem => {
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
        const site = this.props.siteSelectList.find(x => x.name === lastHost);
        if (site && !site.isCollapsed) {
          mycontentlist.push(
            <ContentItem
              key={contentItem.id}
              content={contentItem}
              isAnime={this.props.isAnime}
              isAdult={this.props.isAdult}
              isSelected={
                selectedContentItem && selectedContentItem.id === contentItem.id
              }
              onClick={this.props.selectionActions.selectContentItem}
            />
          );
        }
      });
    }

    const malSearchResults = this.renderResult(
      this.props.malLoading,
      myanimelist
    );
    const contentSearchResults = this.renderResult(
      this.props.contentLoading,
      mycontentlist
    );

    return (
      <div className="search-results">
        <ul className="mal-search-result">{malSearchResults}</ul>
        <ul className="content-search-result">{contentSearchResults}</ul>
      </div>
    );
  }
}

export default SearchResult;
