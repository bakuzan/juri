import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchBox from './search-box';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchBox />, div);
});

it('renders input field', () => {
  const wrapper = shallow(<SearchBox />);
  const input = <input type="text" value />;

  expect(wrapper.contains(input)).toEqual(true);
});

xit('', () => {

});
