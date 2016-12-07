import React, { Component } from 'react';
import './toggle-box.css';
import '../../styles/ripple.css';

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
          <input type="checkbox"
                 name={this.props.name}
                 checked={this.props.isChecked}
                 onChange={(e) => this.handleChange(e)} />
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default ToggleBox;
