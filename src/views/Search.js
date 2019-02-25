import React, { useReducer, useState, useEffect } from 'react';

import SearchBar from 'components/search-bar/search-bar.js';
import SearchResult from 'components/search-result/search-result.js';
import SendSelectedDataToSave from 'components/SendSelectedDataToSave';

import SearchFilters from 'constants/searchFilters';
import useDebounce from 'hooks/useDebounce';
import { isTypeAnime, isAgeAdult } from 'utils';
import constructObjectFromSearchParams from 'utils/constructObjectFromSearchParams';

function useFilterFlags(location) {
  const { type, age } = constructObjectFromSearchParams(location.search || '');
  const isAnime = isTypeAnime(type);
  const isAdult = isAgeAdult(age);
  return { isAnime, isAdult, type, age };
}

const LOADING = 'loading';
const SEARCH = 'search';
const SUCCESS = 'response';

function searchReducer(state, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case SEARCH:
      return { ...state, search: action.value };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        results: action.data.reduce((m, x) => m.add(x.id, x), state.results)
      };
    default:
      return state;
  }
}

function SearchPage(props) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [state, dispatch] = useReducer(searchReducer, {
    isLoading: false,
    results: new Map([]),
    search: ''
  });
  const debouncedSearchTerm = useDebounce(state.search, 750);
  const { isAnime, isAdult, type } = useFilterFlags(props.location);

  useEffect(() => {
    if (state.search) {
      dispatch({ type: LOADING });
      // QUERY FOR DATA HERE
      dispatch({ type: SUCCESS, data: [] });
    }
  }, [isAnime, isAdult, debouncedSearchTerm]);

  return (
    <div className="search">
      <SendSelectedDataToSave
        type={type}
        isAdult={isAdult}
        selectedItem={selectedItem}
      />

      <SearchBar
        searchString={state.searchString}
        isAdult={isAdult}
        isAnime={isAnime}
        onUserInput={(e) => dispatch({ type: SEARCH, value: e.target.value })}
        onCheckboxChange={this.handleCheckboxFilter}
      />

      <SearchResult
        isAdult={isAdult}
        isAnime={isAnime}
        loading={state.isLoading}
        results={state.results}
        selectedItem={selectedItem}
        onSelect={(item) =>
          setSelectedItem((prev) => (prev.id === item.id ? null : item))
        }
      />
    </div>
  );
}

export default SearchPage;
