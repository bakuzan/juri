import React, { Component } from 'react';
import './toggle-box.scss';

const capitaliseFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

class ToggleBox extends Component {
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.checked;
    this.props.handleChange(name, value);
  }
  render() {
    return (
      <div className="toggle-box ripple">
        <label className="toggle-box-text">
          <input
            type="checkbox"
            name={this.props.name}
            checked={this.props.isChecked}
            onChange={(e) => this.handleChange(e)}
          />
          {capitaliseFirstLetter(this.props.text)}
        </label>
      </div>
    );
  }
}

export default ToggleBox;
