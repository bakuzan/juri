import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import ToggleBox from './toggle-box';

describe('testing toggle box component', () => {
  describe('rendering elements', () => {

    it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ToggleBox />, div);
    });

    it('should render input checkbox', () => {
      const wrapper = TestUtils.renderIntoDocument(<ToggleBox />);
      const input = ReactDOM.findDOMNode(wrapper).querySelector('input');

      expect(input).not.toBe(null);
      expect(input.type).toEqual('checkbox');
    });

  });

  describe('testing functions', () => {

    it('should call handleChange on change', () => {
      let value = false;
      const name = 'test';
      const text = 'test toggle box';
      const handleToggleBoxInput = (n, v) => {
        value = v;
      }
      const wrapper = TestUtils.renderIntoDocument(
        <ToggleBox isChecked={value}
                   handleChange={handleToggleBoxInput}
                   name={name}
                   text={text} />
      );
      const input = ReactDOM.findDOMNode(wrapper).querySelector('input');
      expect(value).toEqual(false);

      input.checked = true;
      TestUtils.Simulate.change(input);

      expect(value).toEqual(true);
    });

  });

});
