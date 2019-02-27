import React, { useReducer, useState, useEffect } from 'react';

import SearchBar from 'components/SearchBar';
import SearchResult from 'components/SearchResult';
import SendSelectedDataToSave from 'components/SendSelectedDataToSave';

import Query from 'juriGQL';
import { getSources, getContentSearch } from 'juriGQL/queries';
import SourceType from 'constants/sourceTypes';
import { SourceContext } from 'context';
import useDebounce from 'hooks/useDebounce';
import usePrevious from 'hooks/usePrevious';
import { capitalise } from 'utils';
import {
  buildSearchParams,
  getFilterFlags,
  getTypeFromBool,
  getAgeFromBool
} from 'utils/searchParams';

async function fetchSources({ setSources, setSourceId }, { type, ...params }) {
  const result = await Query({
    query: getSources,
    variables: {
      ...params,
      sourceType: SourceType.search,
      mediaType: capitalise(type)
    }
  });

  const { sources } = result.data || {};
  setSources(sources);
  setSourceId(sources ? sources[0].id : 0);
}

async function fetchSearchResults(dispatch, params) {
  const result = await Query({
    query: getContentSearch,
    variables: {
      ...params
    }
  });
  const { search } = result.data || {};
  console.log('SearchPage > Queried! > ', params, result);
  dispatch({ type: SUCCESS, data: search, sourceId: params.sourceId });
}

const ANIME_STATE_NAME = 'isAnime';
const ADULT_STATE_NAME = 'isAdult';

const LOADING = 'loading';
const SEARCH = 'search';
const SUCCESS = 'response';
const RESET = 'reset';

function searchReducer(state, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
        results: action.clearResults ? new Map([]) : state.results
      };
    case SEARCH:
      return { ...state, searchString: action.value };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        results: state.results.set(action.sourceId, action.data)
      };
    case RESET:
      return { ...state, results: new Map([]) };
    default:
      return state;
  }
}

function SearchPage(props) {
  const { isAnime, isAdult, type, age } = getFilterFlags(props.location);

  const [sources, setSources] = useState([]);
  const [sourceId, setSourceId] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [state, dispatch] = useReducer(searchReducer, {
    isLoading: false,
    results: new Map([]),
    searchString: ''
  });
  const debouncedSearchTerm = useDebounce(state.searchString, 750);
  const prevSearchTerm = usePrevious(debouncedSearchTerm);

  useEffect(() => {
    fetchSources({ setSources, setSourceId }, { type, isAdult });
  }, [type, isAdult]);

  useEffect(() => {
    if (state.searchString && sourceId) {
      dispatch({
        type: LOADING,
        clearResults: debouncedSearchTerm !== prevSearchTerm
      });

      fetchSearchResults(dispatch, {
        sourceId,
        searchString: debouncedSearchTerm
      });
    }
  }, [sourceId, isAnime, isAdult, debouncedSearchTerm]);

  return (
    <SourceContext.Provider value={[sources, setSources]}>
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
          onUserInput={(_, value) => dispatch({ type: SEARCH, value })}
          onCheckboxChange={(name, value) => {
            const isTypeChange = name === ANIME_STATE_NAME;
            const isAdultChange = name === ADULT_STATE_NAME;
            const newType = isTypeChange ? getTypeFromBool(value) : type;
            const newAge = isAdultChange ? getAgeFromBool(value) : age;

            // Reset stored data, changing the type/age will cause requeries.
            setSourceId(0);
            dispatch({ type: RESET });
            props.history.replace(
              `${props.match.url}${buildSearchParams({
                type: newType.toLowerCase(),
                age: newAge.toLowerCase()
              })}`
            );
          }}
        />

        <SearchResult
          isLoading={state.isLoading}
          results={state.results}
          selectedItem={selectedItem}
          onSelectItem={(item) =>
            setSelectedItem((prev) =>
              prev && prev.id === item.id ? null : item
            )
          }
          onSelectSource={setSourceId}
        />
      </div>
    </SourceContext.Provider>
  );
}

export default SearchPage;
