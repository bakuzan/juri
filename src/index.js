import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header.js'
import Routes from './routes';
import './index.css';

ReactDOM.render(
  <div>
    <Header />
    <Routes />
  </div>,
  document.getElementById('root')
);
