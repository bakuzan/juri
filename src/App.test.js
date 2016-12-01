import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import SearchBox from './components/search-box/search-box';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders project name', () => {
  const wrapper = shallow(<App />);
  const project = <h2>JURI</h2>;

  expect(wrapper.contains(project)).toEqual(true);
});

it('renders search-box', () => {
  const wrapper = shallow(<App />);
  const searchBox = <SearchBox />;

  expect(wrapper.contains(searchBox)).toEqual(true);
});
