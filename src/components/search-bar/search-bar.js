import React, { Component } from 'react';
import ToggleBox from '../toggle-box/toggle-box.js';

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
    const currentType = this.props.isAnime ? 'Anime' : 'Manga';
    const currentAge = this.props.isAdult ? '18+' : 'Standard';
    return (
      <form name="searchBarForm" className="search-bar-form">
        <input id="search-box"
               type="text"
               name="searchString"
               placeholder="search..."
               value={this.props.searchString}
               onChange={(e) => this.handleSearchStringInput(e)} />
        <ToggleBox isChecked={this.props.isAnime}
                   handleChange={this.handleToggleBoxInput}
                   name="isAnime"
                   text={currentType} />
        <ToggleBox isChecked={this.props.isAdult}
                   handleChange={this.handleToggleBoxInput}
                   name="isAdult"
                   text={currentAge} />
      </form>
    );
  }
}

export default SearchBar;
