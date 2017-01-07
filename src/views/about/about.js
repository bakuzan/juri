import React, { Component } from 'react';
import { Link } from 'react-router';
import { paths } from '../../constants/paths';
import './about.css';

class About extends Component {
  render() {
    return (
      <article className="about">
        <header>
          <h2>Project JURI</h2>
          <p>Juri is a unified search application.</p>
        </header>
        <div className="content">
          <p>
            Using her Feng Shui engine, Juri is able to retrieve the myanimelist,
            and specified content site entires for the search term and categories entered.
            Further sites can be queried using the site dropdown list, which will append additional results.
          </p>
          <p>
            Juri also provides a latest releases page, powered by
             <a href="https://www.masterani.me/">masterani</a> and <a href="http://mangafox.me/releases">mangafox</a>
            for anime and manga respectively.
          </p>
          <Link to={paths.base}>Home</Link>
          <Link to={paths.latest}>Latest</Link>
        </div>
      </article>
    );
  }
}

export default About;
