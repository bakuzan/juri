import React, { Component } from 'react';
import App from './views/app/app';
import About from './views/about/about';
import {Router, Route, browserHistory} from 'react-router';

class Routes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/about" component={About}/>
      </Router>
    );
  }
}

export default Routes;
