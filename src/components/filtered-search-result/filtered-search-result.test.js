import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import FilteredSearchResult from './filtered-search-result';
import SearchBar from '../search-bar/search-bar';
import SearchResult from '../search-result/search-result';


describe('testing filtered search result', () => {

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FilteredSearchResult />, div);
  });

  it('should render search bar child component', () => {
    const wrapper = TestUtils.renderIntoDocument(<FilteredSearchResult />);
    const foundSearchBars = TestUtils.scryRenderedComponentsWithType(wrapper, SearchBar);

    expect(foundSearchBars).not.toBe(null);
    expect(foundSearchBars.length).toEqual(1);
  });

  it('should render search result child component', () => {
    const wrapper = TestUtils.renderIntoDocument(<FilteredSearchResult />);
    const foundSearchResults = TestUtils.scryRenderedComponentsWithType(wrapper, SearchResult);

    expect(foundSearchResults).not.toBe(null);
    expect(foundSearchResults.length).toEqual(1);
  });

  describe('testing state', () => {
    let filteredSearchResult;
    beforeEach(() => {
      filteredSearchResult = TestUtils.renderIntoDocument(<FilteredSearchResult />);
    });

    it('should initalise state values', () => {
      expect(filteredSearchResult.state.contentResults.toString()).toBe([].toString());
      expect(filteredSearchResult.state.contentResults.length).toBe(0);
      expect(filteredSearchResult.state.isAdult).toBe(false);
      expect(filteredSearchResult.state.isAnime).toBe(true);
      expect(filteredSearchResult.state.malResults.toString()).toBe([].toString());
      expect(filteredSearchResult.state.malResults.length).toBe(0);
      expect(filteredSearchResult.state.searchString).toBe('');
    });

    it('should change state of key value pair passed to handleUserInput', () => {
      const text = 'searhing for something';

      expect(filteredSearchResult.state.isAdult).toBe(false);
      expect(filteredSearchResult.state.isAnime).toBe(true);
      expect(filteredSearchResult.state.searchString).toBe('');

      filteredSearchResult.handleUserInput('isAdult', true);
      filteredSearchResult.handleUserInput('isAnime', false);
      filteredSearchResult.handleUserInput('searchString', text);

      expect(filteredSearchResult.state.isAdult).toBe(true);
      expect(filteredSearchResult.state.isAnime).toBe(false);
      expect(filteredSearchResult.state.searchString).toBe(text);
    });

  });

});
