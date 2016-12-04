import React, { Component } from 'react';

class ToggleBox extends Component {
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.checked;
    this.props.handleChange(name, value);
  }
  render() {
    return (
      <div className="toggle-box">
        <input type="checkbox"
               name={this.props.name}
               checked={this.props.isChecked}
               onChange={(e) => this.handleChange(e)} />
        <span className="toggle-box-text">{this.props.text}</span>
      </div>
    );
  }
}

export default ToggleBox;
