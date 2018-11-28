import React, { Component } from 'react';
import ToggleBox from '../toggle-box/toggle-box.js';
import ClearableInput from '../clearable-input/clearable-input';
import SelectionList from '../selection-list/selection-list.js';
import { getType, getAge } from '../../actions/value';
import '../../styles/float-label.scss';
import './search-bar.scss';
import '../../styles/box-model.scss';

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
    this.props.onCheckboxChange(name, value);
  }
  render() {
    const currentType = getType(this.props.isAnime, false);
    const currentAge = getAge(this.props.isAdult, false);
    return (
      <div className="search-bar">
        <h2 className="title center-contents">
          Search for
          <ToggleBox
            isChecked={this.props.isAnime}
            handleChange={this.handleToggleBoxInput}
            name="isAnime"
            text={currentType}
          />
          on
          <ToggleBox
            isChecked={this.props.isAdult}
            handleChange={this.handleToggleBoxInput}
            name="isAdult"
            text={currentAge}
          />
          <SelectionList
            list={this.props.siteSelectList}
            selectedIndex={this.props.selectedSiteIndex}
            onItemSelect={this.props.onSiteSelect}
            placeholder="sites"
          />
        </h2>
        <div className="text-input-container">
          <ClearableInput
            name="searchString"
            label="search for something"
            value={this.props.searchString}
            onChange={this.handleSearchStringInput}
            autoFocus
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
