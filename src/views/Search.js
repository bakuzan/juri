import React, { useReducer, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { capitalise } from 'ayaka/capitalise';
import { useDebounce } from 'meiko/hooks/useDebounce';
import { usePrevious } from 'meiko/hooks/usePrevious';
import SearchBar from 'components/SearchBar';
import SearchResult from 'components/SearchResult';

import Query from 'juriGQL';
import { getSources, getContentSearch } from 'juriGQL/queries';
import SourceType from 'constants/sourceTypes';
import { SourceContext, SearchContext } from 'context';
import { useStorage } from 'hooks/useStorage';

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
  const { search = [] } = await Query({
    query: getContentSearch,
    variables: {
      ...params
    }
  });

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
        loadingSources: [...state.loadingSources, action.sourceId],
        results: action.clearResults ? new Map([]) : state.results
      };
    case SEARCH:
      return { ...state, sourceId: 0, searchString: action.value };
    case SOURCE:
      return { ...state, sourceId: action.sourceId };
    case SUCCESS:
      return {
        ...state,
        loadingSources: state.loadingSources.filter(
          (x) => x !== action.sourceId
        ),
        results: state.results.set(action.sourceId, action.data)
      };
    case RESET:
      return {
        ...state,
        sourceId: 0,
        loadingSources: [],
        results: new Map([])
      };
    default:
      return state;
  }
}

function SearchPage(props) {
  const {
    isAnime,
    isAdult,
    type,
    age,
    searchString: searchParam
  } = getFilterFlags(props.location);

  const primarySourceKey = `${type}_${isAdult}`;
  const [primarySourceIds, setPrimarySourceIds] = useStorage('search');
  const primarySourceId = primarySourceIds[primarySourceKey];

  const [sources, setSources] = useState([]);
  const [state, dispatch] = useReducer(searchReducer, {
    loadingSources: [],
    searchString: '',
    sourceId: 0,
    results: new Map([])
  });

  const debouncedSearchTerm = useDebounce(state.searchString, 750);
  const prevSearchTerm = usePrevious(debouncedSearchTerm);
  const prevSourceId = usePrevious(state.sourceId);

  function updateUrlParams(queryType, queryAge, querySearch) {
    const newType = getTypeFromBool(queryType);
    const newAge = getAgeFromBool(queryAge);

    props.history.replace(
      `${props.match.url}${buildSearchParams({
        type: newType.toLowerCase(),
        age: newAge.toLowerCase(),
        searchString: querySearch
      })}`
    );
  }

  useEffect(() => {
    if (searchParam) {
      dispatch({ type: SEARCH, value: searchParam });
    }
  }, [searchParam]);

  useEffect(() => {
    fetchSources({ setSources, dispatch, primarySourceId }, { type, isAdult });
  }, [primarySourceId, type, isAdult]);

  const resolvedSourceId = resolveSourceId(primarySourceId, sources);
  useEffect(() => {
    const sourceId = state.sourceId;
    const newSearchTerm = debouncedSearchTerm !== prevSearchTerm;
    const newSourceId = sourceId && sourceId !== prevSourceId;
    const hasNewSourceOrSearchTerm = newSourceId || newSearchTerm;
    const querySourceId = sourceId || resolvedSourceId;

    if (
      debouncedSearchTerm &&
      hasNewSourceOrSearchTerm &&
      querySourceId !== 0
    ) {
      dispatch({
        type: LOADING,
        clearResults: newSearchTerm,
        sourceId: querySourceId
      });

      updateUrlParams(isAnime, isAdult, debouncedSearchTerm);

      fetchSearchResults(dispatch, {
        sourceId: querySourceId,
        searchString: debouncedSearchTerm
      });
    }
  }, [
    resolvedSourceId,
    state.sourceId,
    prevSourceId,
    isAnime,
    isAdult,
    prevSearchTerm,
    debouncedSearchTerm
  ]);

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
            currentlyLoading={state.loadingSources}
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
