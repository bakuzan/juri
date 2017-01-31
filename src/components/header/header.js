import React, { Component } from 'react';
import JuriSvg from '../juri-svg/juri-svg.js';
import { Link } from 'react-router';
import { paths } from '../../constants/paths';
import './header.css';
import '../../styles/ripple.css';
import '../../styles/box-model.css';

class Header extends Component {
  render() {
    return (
      <nav className="juri-header center-contents">
        <Link className="ripple" id="juri-svg" to={paths.base}>
          <JuriSvg />
        </Link>
        <h1>JURI</h1>
        <div id="navigation-links">
          <div className="flex-right center-vertically">
            <Link className="ripple" to={`${paths.base}${paths.latest}`}>
              Latest
            </Link>
            <Link className="ripple" to={`${paths.base}${paths.about}`}>
              About
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
