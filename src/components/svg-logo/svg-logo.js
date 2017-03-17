import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import "./svg-logo.css";

class SvgLogo extends Component {
  constructor() {
    super();

    this.letterClass = 'letter';
    this.animate = 'hideshow';
    this.sideLength = 50;
  }
  componentDidMount() {
    const container = findDOMNode(this);
    this.characters = container.querySelectorAll('text.letter');
    this.cycleCharacters();
  }
  cycleCharacters() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const letterIndex = Array.from(this.characters).findIndex(x => {
        return x.getAttribute('class').indexOf(this.animate) > -1;
      });

      const nextLetterIndex = letterIndex + 1 < this.characters.length ? letterIndex + 1 : 0;
      if(letterIndex !== -1) this.characters[letterIndex].setAttribute('class', this.letterClass);

      this.characters[nextLetterIndex].setAttribute('class', `${this.letterClass} ${this.animate}`);
    }, 3000);
  }
  renderLetters(word) {
    const characters = word.toUpperCase().split('').map((item, index) => {
      return (
        <text key={index} className="letter" x="50%" y="50%" dy="0.3em">
          { item }
        </text>
      );
    });
    return characters;
  }
  render() {
    const letters = this.renderLetters(this.props.text);

    return (
      <div className="svg-logo center-contents">
        <svg xmlns="http://www.w3.org/2000/svg">
          { letters }
          <text className="word diagonal"
                x="50%" y="50%" dy="0.3em"
                textLength={this.sideLength}
                lengthAdjust="spacingAndGlyphs">
            { this.props.text.toUpperCase() }
          </text>
        </svg>
      </div>
    );
  }
}

export default SvgLogo;
