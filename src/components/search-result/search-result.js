import React, { Component } from 'react';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import MalItem from '../mal-item/mal-item';
import ContentItem from '../content-item/content-item';
import './search-result.css';

class SearchResult extends Component {
  collapseResults(siteName) {
    this.props.onSiteCollapse(siteName);
  }
  renderLoadingSpinner() {
    return (<LoadingSpinner size='' />);
  }
  renderEmptyListMessage() {
    return (<li><p>Nothing was found for the current search.</p></li>);
  }
  render() {
    console.log('content: ', this.props.contentResults);
    const myanimelist = this.props.malResults.map((malItem) => {
      return (<MalItem key={malItem.id} content={malItem} isAnime={this.props.isAnime} />);
    });

    let mycontentlist = [];
    let lastHost = '';
    this.props.contentResults.forEach((contentItem) => {
      if (contentItem.host !== lastHost) {
        mycontentlist.push(<li key={contentItem.host}
                               className="content-item host"
                               onClick={() => this.collapseResults(contentItem.host)}>{contentItem.host}</li>);
      }

      lastHost = contentItem.host;
      const site = this.props.siteSelectList.find(x => x.name === lastHost);
      if (!site.isCollapsed) {
        mycontentlist.push(<ContentItem key={contentItem.id} content={contentItem}
                                        isAnime={this.props.isAnime}
                                        isAdult={this.props.isAdult} />);
      }
    });

    const malSearchResults = this.props.malLoading  ? this.renderLoadingSpinner() :
                             myanimelist.length > 0 ? myanimelist :
                                                      this.renderEmptyListMessage();

    const contentSearchResults = this.props.contentLoading ? this.renderLoadingSpinner() :
                                 mycontentlist.length > 0  ? mycontentlist :
                                                             this.renderEmptyListMessage();
    return (
      <div className="search-results">
        <ul className="mal-search-result">
          { malSearchResults }
        </ul>
        <ul className="content-search-result">
          { contentSearchResults }
        </ul>
      </div>
    );
  }
}

export default SearchResult;
