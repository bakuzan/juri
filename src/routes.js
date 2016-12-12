import React, { Component } from 'react';
import App from './views/app/app';
import About from './views/about/about';
import FilteredSearchResult from './components/filtered-search-result/filtered-search-result.js';
import {Router, Route, browserHistory} from 'react-router';

class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={FilteredSearchResult} />
          <Route path="about" component={About} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
