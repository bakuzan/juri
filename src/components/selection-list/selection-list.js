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
            const displayName = `${item.name}${item.alias ? ` (${item.alias})` : ''}`;

            return (
              <li key={item.id}
                  onClick={() => this.handleItemSelect(item.id)}>
                  { displayName }
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
