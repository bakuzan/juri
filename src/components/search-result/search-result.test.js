import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import SearchResult from './search-result';

describe('rendering elements', () => {

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchResult />, div);
  });

});
