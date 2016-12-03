import React, { Component } from 'react';

class ToggleBox extends Component {
  render() {
    return (
      <div className="toggle-box">
        <input type="checkbox"
               checked={this.props.isChecked}
               onChange={() => this.props.handleChange()} />
        <span>{this.props.text}</span>
      </div>
    );
  }
}

export default ToggleBox;
