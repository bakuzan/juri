import React from 'react';
import ReactDOM from 'react-dom';
import {createRenderer, scryRenderedComponentsWithType, scryRenderedDOMComponentsWithTag, renderIntoDocument} from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import SearchBar from './search-bar';
import ToggleBox from '../toggle-box/toggle-box';

describe('rendering elements', () => {

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

});

describe('testing child component props', () => {
  let searchString, isAnime, isAdult, handleUserInput, wrapper;
  beforeEach(() => {
    searchString = 'something to search';
    isAdult = false;
    isAnime = true;
    handleUserInput = () => {  };
    wrapper = renderIntoDocument(
      <SearchBar searchString={searchString}
                       isAdult={isAdult}
                       isAnime={isAnime}
                       onUserInput={handleUserInput} />);
  });

  it('should set toggle box parameters of isAnime, and onUserInput', () => {
    const children = scryRenderedComponentsWithType(wrapper, ToggleBox);

    expect(children[0].props.isChecked).toEqual(isAnime);
    expect(children[0].props.name).toEqual('isAnime');
    expect(typeof children[0].props.handleChange).toEqual('function');
  });

  it('should set toggle box parameters of isAdult, and onUserInput', () => {
    const children = scryRenderedComponentsWithType(wrapper, ToggleBox);

    expect(children[1].props.isChecked).toEqual(isAdult);
    expect(children[1].props.name).toEqual('isAdult');
    expect(typeof children[1].props.handleChange).toEqual('function');
  });

  xit('should set input value to "searchString" value', () => {
    const children = scryRenderedDOMComponentsWithTag(wrapper, 'input');

    expect(children[0].props.value).toEqual(searchString);
  });

  describe('testing toggle box text', () => {

    it('should set toggle box text to "Anime"(isAnime) and "18+"(isAdult) when they are TRUE', () => {
      const isAdult = true;
      const isAnime = true;
      const wrapper = renderIntoDocument(
        <SearchBar isAdult={isAdult}
                   isAnime={isAnime} />);
      const children = scryRenderedComponentsWithType(wrapper, ToggleBox);

      expect(children[0].props.text).toEqual('Anime');
      expect(children[1].props.text).toEqual('18+');
    });

    it('should set toggle box text to "Manga"(isAnime) and "standard"(isAdult) when they are FALSE', () => {
      const isAdult = false;
      const isAnime = false;
      const wrapper = renderIntoDocument(
        <SearchBar isAdult={isAdult}
                   isAnime={isAnime} />);
      const children = scryRenderedComponentsWithType(wrapper, ToggleBox);

      expect(children[0].props.text).toEqual('Manga');
      expect(children[1].props.text).toEqual('Standard');
    });

    describe('testing text switching on click', () => {

    });

  });

  describe('testing functions', () => {

  });

});
