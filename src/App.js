import React, { Component } from 'react';
import logo from './logo.svg';
import FilteredSearchResult from './components/filtered-search-result/filtered-search-result.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>JURI</h2>
        </div>
        <p className="App-intro">
          To get started, search for something.
        </p>
        <FilteredSearchResult />
      </div>
    );
  }
}

export default App;
