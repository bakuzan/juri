import React, { Component } from 'react';
import FilteredSearchResult from './components/filtered-search-result/filtered-search-result.js'
import JuriSvg from './components/juri-svg/juri-svg.js'
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <a id="juri-svg" href="/">
            <JuriSvg />
          </a>
          <h2>JURI</h2>
        </div>
        <FilteredSearchResult />
      </div>
    );
  }
}

export default App;
