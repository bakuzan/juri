import React from 'react';
import ReactDOM from 'react-dom';
import {createRenderer, scryRenderedComponentsWithType, renderIntoDocument} from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import SearchBar from './search-bar';

it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBar />, div);
});

it('should render input field', () => {
  const wrapper = renderIntoDocument(<SearchBar />);
  const query = ReactDOM.findDOMNode(wrapper).querySelectorAll('#search-input');

  expect(query.length).toEqual(1);
});

it('should render two toggle boxes', () => {
  const wrapper = renderIntoDocument(<SearchBar />);
  const query = ReactDOM.findDOMNode(wrapper).querySelectorAll('.toggle-box');

  expect(query.length).toEqual(2);
});
