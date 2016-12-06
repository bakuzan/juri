import React, { Component } from 'react';
import FilteredSearchResult from '../filtered-search-result/filtered-search-result.js'
import JuriSvg from '../juri-svg/juri-svg.js'
import './app.css';
import '../../styles/box-model.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header center-contents">
          <a id="juri-svg" href="/">
            <JuriSvg />
          </a>
          <h1>JURI</h1>
          <a href="/about">
            About
          </a>
        </div>
        <FilteredSearchResult />
      </div>
    );
  }
}

export default App;
