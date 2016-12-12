import React, { Component } from 'react';
import JuriSvg from '../juri-svg/juri-svg.js';
import { Link } from 'react-router';
import { paths } from '../../constants/paths';
import './header.css';
import '../../styles/box-model.css';

class Header extends Component {
  render() {
    return (
      <div className="juri-header center-contents">
        <Link id="juri-svg" to={paths.base}>
          <JuriSvg />
        </Link>
        <h1>JURI</h1>
        <Link id="about-link" to={`${paths.base}${paths.about}`}>
          About
        </Link>
      </div>
    );
  }
}

export default Header;
