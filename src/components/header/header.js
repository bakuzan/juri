import React, { Component } from 'react';
import SvgLogo from '../svg-logo/svg-logo.js';
import { NavLink } from 'react-router-dom';
import { paths } from '../../constants/paths';
import * as searchFilters from '../../constants/search-filters';
import './header.css';
import '../../styles/ripple.css';
import '../../styles/box-model.css';

class Header extends Component {
  render() {
    return (
      <nav className="juri-header center-contents">
        <NavLink
          className="ripple center-contents"
          activeClassName="active"
          id="juri-svg"
          to={paths.base}
        >
          <SvgLogo text="Juri" />
        </NavLink>
        <h1>JURI</h1>
        <div id="navigation-links">
          <div className="flex-right">
            <NavLink
              className="ripple center-contents"
              activeClassName="active"
              to={`${paths.base}${paths.latest}?type=${
                searchFilters.IS_ANIME_TRUE
              }`}
            >
              Latest
            </NavLink>
            <NavLink
              className="ripple center-contents"
              activeClassName="active"
              to={`${paths.base}${paths.about}`}
            >
              About
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
