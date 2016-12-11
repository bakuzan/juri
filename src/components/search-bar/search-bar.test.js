import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import * as searchFilters from '../../constants/search-filters';
import SearchBar from './search-bar';
import ToggleBox from '../toggle-box/toggle-box';

describe('rendering elements', () => {

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchBar />, div);
  });

  it('should render input field', () => {
    const wrapper = TestUtils.renderIntoDocument(<SearchBar />);
    const query = ReactDOM.findDOMNode(wrapper).querySelectorAll('#search-input');

    expect(query.length).toEqual(1);
  });

  it('should render two toggle boxes', () => {
    const wrapper = TestUtils.renderIntoDocument(<SearchBar />);
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
    handleUserInput = (n, v) => { }
    wrapper = TestUtils.renderIntoDocument(
      <SearchBar searchString={searchString}
                 isAdult={isAdult}
                 isAnime={isAnime}
                 onUserInput={handleUserInput} />);
  });

  it('should set toggle box parameters of isAnime, and onUserInput', () => {
    const children = TestUtils.scryRenderedComponentsWithType(wrapper, ToggleBox);

    expect(children[0].props.isChecked).toEqual(isAnime);
    expect(children[0].props.name).toEqual('isAnime');
    expect(typeof children[0].props.handleChange).toEqual('function');
  });

  it('should set toggle box parameters of isAdult, and onUserInput', () => {
    const children = TestUtils.scryRenderedComponentsWithType(wrapper, ToggleBox);

    expect(children[1].props.isChecked).toEqual(isAdult);
    expect(children[1].props.name).toEqual('isAdult');
    expect(typeof children[1].props.handleChange).toEqual('function');
  });

  it('should set input value to "searchString" value', () => {
    const input = ReactDOM.findDOMNode(wrapper).querySelector('input');

    TestUtils.Simulate.change(input);
    console.log(input.props);
    expect(input.value).toEqual(searchString);
  });

  describe('testing toggle box text', () => {

    it('should set toggle box text to "Anime"(isAnime) and "18+"(isAdult) when they are TRUE', () => {
      const isAdult = true;
      const isAnime = true;
      const wrapper = TestUtils.renderIntoDocument(
        <SearchBar isAdult={isAdult}
                   isAnime={isAnime} />);
      const children = TestUtils.scryRenderedComponentsWithType(wrapper, ToggleBox);

      expect(children[0].props.text).toEqual(searchFilters.IS_ANIME_TRUE);
      expect(children[1].props.text).toEqual(searchFilters.IS_ADULT_TRUE);
    });

    it('should set toggle box text to "Manga"(isAnime) and "standard"(isAdult) when they are FALSE', () => {
      const isAdult = false;
      const isAnime = false;
      const wrapper = TestUtils.renderIntoDocument(
        <SearchBar isAdult={isAdult}
                   isAnime={isAnime} />);
      const children = TestUtils.scryRenderedComponentsWithType(wrapper, ToggleBox);

      expect(children[0].props.text).toEqual(searchFilters.IS_ANIME_FALSE);
      expect(children[1].props.text).toEqual(searchFilters.IS_ADULT_FALSE);
    });

    describe('testing text switching on click', () => {

      it('should change text output on toggle box changes', () => {
        let isAdult = false;
        let isAnime = false;
        const onUserInput = (name, value) => {
          console.log(name, value);
          if (name === 'isAnime') isAnime = value;
          if (name === 'isAdult') isAdult = value;
        }
        const wrapper = TestUtils.renderIntoDocument(
          <SearchBar isAdult={isAdult}
                     isAnime={isAnime}
                     onUserInput={onUserInput} />);
        let children = TestUtils.scryRenderedComponentsWithType(wrapper, ToggleBox);
        const checkboxOne = ReactDOM.findDOMNode(wrapper).querySelector('input[name="isAnime"]');
        const checkboxTwo = ReactDOM.findDOMNode(wrapper).querySelector('input[name="isAdult"]');

        expect(children[0].props.text).toEqual(searchFilters.IS_ANIME_FALSE);
        expect(children[1].props.text).toEqual(searchFilters.IS_ADULT_FALSE);

        checkboxOne.checked = true;
        checkboxTwo.checked = true;
        TestUtils.Simulate.change(checkboxOne);
        TestUtils.Simulate.change(checkboxTwo);

        expect(children[0].props.text).toEqual(searchFilters.IS_ANIME_TRUE);
        expect(children[1].props.text).toEqual(searchFilters.IS_ADULT_TRUE);
      });

    });

  });

  describe('testing functions', () => {

  });

});
