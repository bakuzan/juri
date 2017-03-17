import React, { Component } from 'react';
import SvgLogo from '../svg-logo/svg-logo.js';
import { Link } from 'react-router';
import { paths } from '../../constants/paths';
import './header.css';
import '../../styles/ripple.css';
import '../../styles/box-model.css';

class Header extends Component {
  render() {
    return (
      <nav className="juri-header center-contents">
        <Link className="ripple center-contents"
              activeClassName="active"
              id="juri-svg" to={paths.base}>
          <SvgLogo text="Juri" />
        </Link>
        <h1>JURI</h1>
        <div id="navigation-links">
          <div className="flex-right">
            <Link className="ripple center-contents"
                  activeClassName="active"
                  to={`${paths.base}${paths.latest}`}>
              Latest
            </Link>
            <Link className="ripple center-contents"
                  activeClassName="active"
                  to={`${paths.base}${paths.about}`}>
              About
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
