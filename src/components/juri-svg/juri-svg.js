import React, { Component } from 'react';
import './juri-svg.css';

class JuriSvg extends Component {
  render() {
    return (
      <svg className="juri-svg" viewBox="-20 -60 80 80" preserveAspectRatio="xMaxYMax meet" xmlns="http://www.w3.org/2000/svg">
        <text className="letter hideshow" id="jay" x="2" y="-0">
          J
        </text>
        <text className="letter hideshow" id="you" x="-5" y="-0">
          U
        </text>
        <text className="letter hideshow" id="are" x="-6" y="-0">
          R
        </text>
        <text className="letter hideshow" id="eye" x="9" y="-0">
          I
        </text>
        <text id="word" className="diagonal" x="-0" y="-0">
          JURI
        </text>
      </svg>
    );
  }
}

export default JuriSvg;
