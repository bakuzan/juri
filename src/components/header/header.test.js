import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import Header from './header';
import JuriSvg from '../juri-svg/juri-svg.js';

describe('testing header', () => {

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
  });

  it('should render a juri svg', () => {
    const wrapper = TestUtils.renderIntoDocument(<Header />);
    const juri = TestUtils.scryRenderedComponentsWithType(wrapper, JuriSvg);

    expect(juri).not.toBe(null);
    expect(juri.length).toEqual(1);
  });

  xdescribe('using header links', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = TestUtils.renderIntoDocument(<Header />);
    });

    it('should take you to about page on link click', () => {
      const link = ReactDOM.findDOMNode(wrapper).querySelector('#about-link');
      console.log(link);
      expect(link.href).toBe();
      TestUtils.Simulate.click(link);
    });

    it('should take you to base page on svg click', () => {

    });

  });

});
