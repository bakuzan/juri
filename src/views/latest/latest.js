import React, { Component } from 'react';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ToggleBox from '../../components/toggle-box/toggle-box.js';
import ContentItem from '../../components/content-item/content-item';
import { getType } from '../../actions/value';
import { contentLatest } from '../../actions/query';

class Latest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnime: true,
      latestResults: [],
      loading: true
    };
    const type = getType(this.state.isAnime, true);
    this.fetchLatest(type);

    this.handleUserInput = this.handleUserInput.bind(this);
  }
  handleUserInput(name, value) {
    this.setState({
      [name]: value,
      loading: true
    });
    const type = getType(this.state.isAnime, true);
    this.fetchLatest(type);
  }
  fetchLatest(type) {
    contentLatest({ type }).then((response) => {
      this.setState({
        latestResults: response,
        loading: false
      });
    });
  }
  buildContentList(list) {
    return list.map((item) => {
      return (<ContentItem key={item.id} content={item}
                           isAnime={this.state.isAnime}
                           isAdult={false} />);
    });
  }
  renderLatestResult(isLoading, resultList) {
      return isLoading         ? (<LoadingSpinner size='' />) :
             resultList.length ? this.buildContentList(resultList) :
                                 (<li><p>Nothing was found for the current search.</p></li>);
  }
  render() {
    const currentType = getType(this.state.isAnime, false);
    const latestRenderResult = this.renderLatestResult(this.state.isAnime, this.state.latestResults);

    return (
      <div className="latest">
        <h2 className="center-contents">
          Latest releases for
          <ToggleBox isChecked={this.state.isAnime}
                     handleChange={this.handleUserInput}
                     name="isAnime"
                     text={currentType} />
        </h2>
        <ul className="latest-content-list">
          { latestRenderResult }
        </ul>
      </div>
    );
  }
}

export default Latest;
