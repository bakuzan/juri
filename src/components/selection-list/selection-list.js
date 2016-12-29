import React, { Component } from 'react';
import './selection-list.css';

class SelectionList extends Component {
  handleItemSelect(id) {
    this.props.onItemSelect(id);
  }
  render() {
    return (
      <div className="selection-list-container">
        <ul className="selection-list">
        { this.props.list &&
          this.props.list.map((item) => {
            return (
              <li key={item.id}
                  onClick={() => this.handleItemSelect(item.id)}>
                  {item.name}
              </li>
            );
          })
        }
        </ul>
        {this.props.placeholder}
      </div>
    );
  }
}

export default SelectionList;
