import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NewTabLink from '../../components/new-tab-link';
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
            <NewTabLink href="https://www.masterani.me/">masterani</NewTabLink>
            and
            <NewTabLink href="http://mangafox.me/releases/">
              mangafox
            </NewTabLink>
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
