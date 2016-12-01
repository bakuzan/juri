import React, { Component } from 'react';

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };
  }
  handleChange(event) {
    this.setState({
      searchString: event.target.value
    });
  }
  render() {
    return (
      <div className="search-box">
        <input type="text"
               value={this.state.searchString}
               onChange={(e) => this.handleChange(e)} />
      </div>
    );
  }
}

export default SearchBox;
