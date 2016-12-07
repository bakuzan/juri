import React, { Component } from 'react';
import JuriSvg from '../juri-svg/juri-svg.js'
import './header.css';
import '../../styles/box-model.css';

class Header extends Component {
  render() {
    return (
      <div className="juri-header center-contents">
        <a id="juri-svg" href="/">
          <JuriSvg />
        </a>
        <h1>JURI</h1>
        <a id="about-link" href="/about">
          About
        </a>
      </div>
    );
  }
}

export default Header;
