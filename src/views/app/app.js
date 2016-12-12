import React, { Component } from 'react';
import Header from '../../components/header/header.js'
import './app.css';

class App extends Component {
  render() {
    return (
      <div className="juri">
        <Header />
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default App;
