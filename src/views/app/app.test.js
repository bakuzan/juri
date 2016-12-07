import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './app';
import FilteredSearchResult from '../../components/filtered-search-result/filtered-search-result.js';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
