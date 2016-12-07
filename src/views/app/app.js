import React, { Component } from 'react';
import FilteredSearchResult from '../../components/filtered-search-result/filtered-search-result.js';
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="juri">
        <FilteredSearchResult />
      </div>
    );
  }
}

export default App;
