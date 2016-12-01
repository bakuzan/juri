import React, { Component } from 'react';
import logo from './logo.svg';
import SearchBox from './components/search-box/search-box.js';
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
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SearchBox />
      </div>
    );
  }
}

export default App;
