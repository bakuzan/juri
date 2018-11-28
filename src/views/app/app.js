import React, { Component } from 'react';
import Header from '../../components/header/header.js';
import './app.scss';

class App extends Component {
  render() {
    return (
      <div className="juri">
        <Header />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default App;
