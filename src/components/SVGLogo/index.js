import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';

import './SVGLogo.scss';

class SvgLogo extends React.Component {
  constructor(props) {
    super(props);

    this.letterClass = classNames('letter');
    this.animate = classNames('hideshow');
    this.sideLength = 50;
    this.characters = null;
    this.interval = null;
  }

  componentDidMount() {
    this.initLogo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.initLogo();
    }
  }

  initLogo() {
    const container = findDOMNode(this);
    this.characters = container.querySelectorAll(`text.${this.letterClass}`);
    this.cycleCharacters();
  }

  cycleCharacters() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const letterIndex = Array.from(this.characters).findIndex((x) => {
        return x.getAttribute('class').indexOf(this.animate) > -1;
      });

      const nextLetterIndex =
        letterIndex + 1 < this.characters.length ? letterIndex + 1 : 0;

      if (letterIndex !== -1 && this.characters[letterIndex]) {
        this.characters[letterIndex].setAttribute('class', this.letterClass);
      }

      const nextLetter = this.characters[nextLetterIndex];
      if (!nextLetter) {
        return;
      }

      nextLetter.setAttribute(
        'class',
        classNames(this.letterClass, this.animate)
      );
    }, 1500);
  }

  renderLetters(word) {
    const characters = word
      .toUpperCase()
      .split('')
      .map((item, index) => {
        return (
          <text
            key={index}
            className={classNames('letter')}
            x="50%"
            y="50%"
            dy="0.3em"
          >
            {item}
          </text>
        );
      });
    return characters;
  }

  render() {
    const letters = this.renderLetters(this.props.text);

    return (
      <div
        id={this.props.id}
        className={classNames('svg-logo', 'center-contents')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="svg-logo__svg">
          {letters}
          <text
            className={classNames('word', 'diagonal')}
            x="50%"
            y="50%"
            dy="0.3em"
            textLength={this.sideLength}
            lengthAdjust="spacingAndGlyphs"
          >
            {this.props.text.toUpperCase()}
          </text>
        </svg>
      </div>
    );
  }
}

SvgLogo.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default SvgLogo;
