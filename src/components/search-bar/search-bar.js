import React, { Component } from 'react';
import ToggleBox from '../toggle-box/toggle-box.js';
import { getType, getAge } from '../../actions/value';
import '../../styles/float-label.css';
import './search-bar.css';
import '../../styles/box-model.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSearchStringInput = this.handleSearchStringInput.bind(this);
    this.handleToggleBoxInput = this.handleToggleBoxInput.bind(this);
  }
  handleSiteRequest(index) {
    this.props.onSiteSelect(index);
  }
  handleSearchStringInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.props.onUserInput(name, value);
  }
  handleToggleBoxInput(name, value) {
    this.props.onUserInput(name, value);
  }
  render() {
    const currentType = getType(this.props.isAnime, false);
    const currentAge = getAge(this.props.isAdult, false);
    return (
      <div className="search-bar">
        <h2 className="center-contents">
          Search for
          <ToggleBox isChecked={this.props.isAnime}
                     handleChange={this.handleToggleBoxInput}
                     name="isAnime"
                     text={currentType} />
          on
          <ToggleBox isChecked={this.props.isAdult}
                     handleChange={this.handleToggleBoxInput}
                     name="isAdult"
                     text={currentAge} />
          <span className="selection-list-container">
            <ul className="selection-list">
            { this.props.siteSelectList &&
              this.props.siteSelectList.map((site) => {
                return (<li key={site.id} onClick={() => this.handleSiteRequest(site.id)}>{site.name}</li>);
              })
            }
            </ul>
            sites
          </span>
        </h2>
        <div className="has-float-label text-input-container">
          <input id="search-input"
                 type="text"
                 name="searchString"
                 placeholder="search..."
                 value={this.props.searchString}
                 onChange={(e) => this.handleSearchStringInput(e)} autoFocus />
          <label>search for something</label>
        </div>
      </div>
    );
  }
}

export default SearchBar;
