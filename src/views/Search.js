import React, { useReducer, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import SearchBar from 'components/SearchBar';
import SearchResult from 'components/SearchResult';

import Query from 'juriGQL';
import { getSources, getContentSearch } from 'juriGQL/queries';
import SourceType from 'constants/sourceTypes';
import { SourceContext, SearchContext } from 'context';
import { useDebounce } from 'hooks/useDebounce';
import { usePrevious } from 'hooks/usePrevious';
import { useStorage } from 'hooks/useStorage';
import { capitalise } from 'utils';
import {
  buildSearchParams,
  getFilterFlags,
  getTypeFromBool,
  getAgeFromBool
} from 'utils/searchParams';

function resolveSourceId(primarySourceId, sources) {
  const firstSource = sources[0];
  return primarySourceId && sources.some((x) => x.id === primarySourceId)
    ? primarySourceId
    : firstSource
    ? firstSource.id
    : 0;
}

async function fetchSources(
  { setSources, dispatch, primarySourceId },
  { type, ...params }
) {
  const result = await Query({
    query: getSources,
    variables: {
      ...params,
      sourceType: SourceType.search,
      mediaType: capitalise(type)
    }
  });

  const { sources = [] } = result;
  const sourceId = resolveSourceId(primarySourceId, sources);

  setSources(sources);
  dispatch({ type: SOURCE, sourceId });
}

async function fetchSearchResults(dispatch, params) {
  const result = await Query({
    query: getContentSearch,
    variables: {
      ...params
    }
  });
  const { search = [] } = result;

  dispatch({ type: SUCCESS, data: search, sourceId: params.sourceId });
}

const ANIME_STATE_NAME = 'isAnime';
const ADULT_STATE_NAME = 'isAdult';

const LOADING = 'loading';
const SEARCH = 'search';
const SOURCE = 'source';
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
      return { ...state, sourceId: 0, searchString: action.value };
    case SOURCE:
      return { ...state, sourceId: action.sourceId };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        results: state.results.set(action.sourceId, action.data)
      };
    case RESET:
      return { ...state, sourceId: 0, results: new Map([]) };
    default:
      return state;
  }
}

function SearchPage(props) {
  const { isAnime, isAdult, type, age } = getFilterFlags(props.location);
  const primarySourceKey = `${type}_${isAdult}`;

  const [primarySourceIds, setPrimarySourceIds] = useStorage('search');
  const primarySourceId = primarySourceIds[primarySourceKey];

  const [sources, setSources] = useState([]);
  const [state, dispatch] = useReducer(searchReducer, {
    isLoading: false,
    searchString: '',
    sourceId: 0,
    results: new Map([])
  });

  const debouncedSearchTerm = useDebounce(state.searchString, 750);
  const prevSearchTerm = usePrevious(debouncedSearchTerm);

  useEffect(() => {
    fetchSources({ setSources, dispatch, primarySourceId }, { type, isAdult });
  }, [type, isAdult]);

  useEffect(() => {
    const { sourceId } = state;
    const newSearchTerm = debouncedSearchTerm !== prevSearchTerm;
    const hasSourceOrNewSearchTerm = sourceId || newSearchTerm;

    if (!state.isLoading && debouncedSearchTerm && hasSourceOrNewSearchTerm) {
      dispatch({
        type: LOADING,
        clearResults: newSearchTerm
      });

      fetchSearchResults(dispatch, {
        sourceId: sourceId || resolveSourceId(primarySourceId, sources),
        searchString: debouncedSearchTerm
      });
    }
  }, [state.sourceId, isAnime, isAdult, debouncedSearchTerm]);

  return (
    <SourceContext.Provider value={[sources, setSources]}>
      <div className="search">
        <Helmet title="Search" />
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
            dispatch({ type: RESET });
            props.history.replace(
              `${props.match.url}${buildSearchParams({
                type: newType.toLowerCase(),
                age: newAge.toLowerCase()
              })}`
            );
          }}
        />

        <SearchContext.Provider value={{ type, isAdult, dispatch }}>
          <SearchResult
            isLoading={state.isLoading}
            sourceId={state.sourceId}
            primarySourceId={primarySourceId}
            results={state.results}
            onSelectPrimarySource={(id) =>
              setPrimarySourceIds({ [primarySourceKey]: id })
            }
          />
        </SearchContext.Provider>
      </div>
    </SourceContext.Provider>
  );
}

export default SearchPage;
