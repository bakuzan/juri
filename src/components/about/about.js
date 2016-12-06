import React, { Component } from 'react';

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
            <a href="/">back</a>
          </p>
        </div>
      </article>
    );
  }
}

export default About;
