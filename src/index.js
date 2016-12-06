import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import About from './components/about/about';
import {Router, Route, browserHistory} from 'react-router';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/about" component={About}/>
  </Router>,
  document.getElementById('root')
);
