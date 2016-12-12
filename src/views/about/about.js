import React, { Component } from 'react';
import { Link } from 'react-router';
import { paths } from '../../constants/paths';

class About extends Component {
  render() {
    return (
      <article className="about">
        <header>
          <h2>Project JURI</h2>
        </header>
        <div>
          <p>
            This page will be for explaining project JURI, displaying version numbers and such.
            <br /><br />
            <b>Status:</b> Work in progress.
            <br /><br />
            <Link to={paths.base}>back</Link>
          </p>
        </div>
      </article>
    );
  }
}

export default About;
