import classNames from 'classnames';
import React, { Component } from 'react';
import './selection-list.css';

class SelectionList extends Component {
  handleItemSelect(id, index) {
    if (this.props.selectedIndex === index) return;
    this.props.onItemSelect(id);
  }
  render() {
    return (
      <div className="selection-list-container">
        <ul className="selection-list">
          {this.props.list &&
            this.props.list.map((item, index) => {
              const isSelected = this.props.selectedIndex === index;
              const displayName = `${item.name}${
                item.alias ? ` (${item.alias})` : ''
              }`;

              return (
                <li
                  key={item.id}
                  role="button"
                  className={classNames({ selected: isSelected })}
                  onClick={() => this.handleItemSelect(item.id, index)}
                >
                  {displayName}
                </li>
              );
            })}
        </ul>
        {this.props.placeholder}
      </div>
    );
  }
}

export default SelectionList;
