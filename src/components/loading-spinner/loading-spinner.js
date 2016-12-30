import React, { Component } from 'react';
import './loading-spinner.css';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className={`loader ${this.props.size}`}>
      	<svg className="circular" viewBox="25 25 50 50">
      		<circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
      	</svg>
      </div>
    );
  }
}

export default LoadingSpinner;
