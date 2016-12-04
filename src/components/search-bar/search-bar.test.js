import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchBox from './search-box';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBox />, div);
});

xit('renders input field', () => {
  const wrapper = shallow(<SearchBox />);
  const input = <input type="text" value />;

  expect(wrapper.contains(input)).toEqual(true);
});

xit('SearchBox state changes when input value is updated', () => {
  const searchBox = shallow(<SearchBox />);
  const text = 'steins;gate';

  expect(searchBox.state.searchString).toEqual('');
  searchBox.value = text;
  searchBox.find('input').simulate('change');
  expect(searchBox.state.searchString).toEqual(text);
});
