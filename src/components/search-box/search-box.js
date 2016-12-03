import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div className="search-box">
        <input type="text"
               value={this.props.searchString}
               onChange={() => this.props.handleChange()} />
      </div>
    );
  }
}

export default SearchBox;
