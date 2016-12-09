import React, { Component } from 'react';
import ToggleBox from '../toggle-box/toggle-box.js';
import * as searchFilters from '../../constants/search-filters';
import '../../styles/float-label.css';
import './search-bar.css';
import '../../styles/box-model.css';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSearchStringInput = this.handleSearchStringInput.bind(this);
    this.handleToggleBoxInput = this.handleToggleBoxInput.bind(this);
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
    const currentType = this.props.isAnime ? searchFilters.IS_ANIME_TRUE : searchFilters.IS_ANIME_FALSE;
    const currentAge = this.props.isAdult ? searchFilters.IS_ADULT_TRUE : searchFilters.IS_ADULT_FALSE;
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
          sites
        </h2>
        <div className="has-float-label text-input-container">
          <input id="search-input"
                 type="text"
                 name="searchString"
                 placeholder="search..."
                 value={this.props.searchString}
                 onChange={(e) => this.handleSearchStringInput(e)} />
          <label>search for something</label>
        </div>
      </div>
    );
  }
}

export default SearchBar;
