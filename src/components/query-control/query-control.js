import React, { Component } from 'react';
import SearchBox from '../search-box/search-box.js';
import ToggleBox from '../toggle-box/toggle-box.js';

class QueryControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdult: false,
      isAnime: true,
      searchString: ''
    };

    this.handleUserInput = this.handleUserInput.bind(this);
  }
  handleUserInput() {
    this.setState({
      isAdult: this.isAdultInput.checked,
      isAnime: this.isAnimeInput.checked,
      searchString: this.searchStringInput.value
    });
  }
  render() {
    const currentType = this.state.isAnime ? 'Anime' : 'Manga';
    const currentAge = this.state.isAdult ? '18+' : 'Standard';
    return (
      <form>
        <SearchBox searchString={this.state.searchString}
                   ref={(input) => this.searchStringInput = input}
                   handleChange={this.handleUserInput} />
        <ToggleBox isChecked={this.state.isAnime}
                   ref={(input) => this.isAnimeInput = input}
                   handleChange={this.handleUserInput}
                   text={currentType} />
        <ToggleBox isChecked={this.state.isAdult}
                   ref={(input) => this.isAdultInput = input}
                   handleChange={this.handleUserInput}
                   text={currentAge} />
      </form>
    );
  }
}

export default QueryControl;
