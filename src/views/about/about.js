import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { paths } from '../../constants/paths';
import './about.css';

class About extends Component {
  render() {
    return (
      <article className="about">
        <header>
          <h2>Project JURI</h2>
          <p className="subtitle">Juri is a unified search application.</p>
        </header>
        <div className="content">
          <p>
            Using her Feng Shui engine, Juri is able to retrieve the
            myanimelist, and specified content site entires for the search term
            and categories entered. Further sites can be queried using the site
            dropdown list, which will append additional results.
          </p>
          <p>
            Juri also provides a latest releases page, powered by
            <a
              href="https://www.masterani.me/"
              target="_blank"
              rel="noopener noreferrer"
            >
              masterani
            </a>
            and
            <a
              href="http://mangafox.me/releases/"
              target="_blank"
              rel="noopener noreferrer"
            >
              mangafox
            </a>
            for anime and manga respectively.
          </p>
          <div id="about-juri-links">
            <h4>Pages to visit:</h4>
            <ul>
              <li>
                <NavLink to={paths.base}>Home</NavLink>
                Search myanimelist and content sites based on type and age
                selections.
              </li>
              <li>
                <NavLink to={`${paths.base}${paths.latest}`}>Latest</NavLink>
                View latest anime and manga releases, with entries on
                myanimelist appearing highlighted.
              </li>
            </ul>
          </div>
        </div>
      </article>
    );
  }
}

export default About;
