import React, { useReducer, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import ToggleBox from 'components/ToggleBox';
import SelectBox from 'components/SelectBox';
import ContentItem from 'components/ContentItem';
import Grid from 'components/Grid';
import { Button } from 'components/Button';
import StickyHeader from 'components/StickyHeader';

import Query from 'juriGQL';
import { getSources, getContentLatest } from 'juriGQL/queries';
import SourceType from 'constants/sourceTypes';
import Icons from 'constants/icons';
import { mediaTypeText } from 'constants/searchFilters';
import { useStorage } from 'hooks/useStorage';
import { useNotRecommendedEventCallback } from 'hooks/useNotRecommendedEventCallback';
import { capitalise, generateUniqueId } from 'utils';
import {
  buildSearchParams,
  getFilterFlags,
  getTypeFromBool
} from 'utils/searchParams';

import './Latest.scss';

function resolveLatestSourceId(sources, sourceId) {
  const source = sources && sources[0];
  if (!source) {
    return sourceId;
  }

  if (sources.some((x) => x.id === sourceId)) {
    return sourceId;
  }

  return source.id;
}

async function fetchSources(setSourceData, { type, latestDefaultSources }) {
  const result = await Query({
    query: getSources,
    variables: {
      sourceType: SourceType.latest,
      mediaType: capitalise(type)
    }
  });

  const { sources } = result.data || {};
  const sourceId = Number(
    resolveLatestSourceId(sources, latestDefaultSources[type])
  );
  setSourceData({ sources, sourceId });
}

async function fetchContentResults(dispatch, params) {
  const result = await Query({
    query: getContentLatest,
    variables: {
      ...params
    }
  });
  const { latest } = result.data || {};
  console.log('LatestPage > Queried! > ', params, result);
  dispatch({ type: LOAD, latest });
}

const initialSourceData = { sources: [], sourceId: 0 };

const LOADING = 'loading';
const LOAD = 'load';
const REFRESH = 'refresh';
const LOAD_MORE = 'load-more';

function latestReducer(state, action) {
  console.log('%c DISPATCH!', 'color: hotpink', state, action);
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true, page: 1, results: [] };
    case LOAD:
      return {
        ...state,
        isLoading: false,
        results:
          state.page === 1
            ? action.latest
            : [...state.results, ...action.latest]
      };
    case REFRESH:
      return {
        ...state,
        page: 1,
        refreshKey: generateUniqueId(),
        results: [],
        isLoading: true
      };
    case LOAD_MORE:
      return { ...state, page: state.page + 1, isLoading: true };
    default:
      return state;
  }
}

function LatestPage({ location, ...props }) {
  const { isAnime, type } = getFilterFlags(location);
  const [latestDefaultSources, setLatestDefaultSources] = useStorage('latest');
  const [sourceData, setSourceData] = useState(initialSourceData);
  const [state, dispatch] = useReducer(latestReducer, {
    refreshKey: generateUniqueId(),
    isLoading: true,
    page: 1,
    results: []
  });

  useEffect(() => {
    function setSourceInformation(values) {
      setLatestDefaultSources({ [type]: values.sourceId });
      setSourceData(values);
    }

    dispatch({ type: LOADING });
    fetchSources(setSourceInformation, { type, latestDefaultSources });
  }, [type]);

  useEffect(() => {
    if (sourceData.sourceId) {
      fetchContentResults(dispatch, {
        sourceId: sourceData.sourceId,
        page: state.page
      });
    }
  }, [sourceData.sourceId, state.page, state.refreshKey]);

  const siteOptions = sourceData.sources.map((o) => ({
    value: o.id,
    text: o.name
  }));

  const disableSiteChanger = siteOptions.length < 2;
  const activeSite = sourceData.sources.find(
    (x) => x.id === sourceData.sourceId
  );
  const hasPaging = activeSite && activeSite.isPaged;

  const handleLoadMore = useNotRecommendedEventCallback(() => {
    if (hasPaging && !state.isLoading) {
      dispatch({ type: LOAD_MORE });
    }
  }, [hasPaging, state.isLoading]);

  return (
    <div className="latest-page">
      <Helmet title="Latest" />
      <StickyHeader>
        <h2 className="latest-page__header">
          <SelectBox
            id="site"
            name="site"
            text="Site"
            value={sourceData.sourceId}
            options={siteOptions}
            onSelect={(event) => {
              const sourceId = Number(event.target.value);
              dispatch({ type: LOADING });
              setLatestDefaultSources({ [type]: sourceId });
              setSourceData((prev) => ({ ...prev, sourceId }));
            }}
            disabled={disableSiteChanger}
          />
          <div className="center-contents latest-page__title">
            Latest releases for
            <ToggleBox
              name="isAnime"
              label="Is anime"
              checked={isAnime}
              handleChange={(name, value) => {
                const type = getTypeFromBool(value, true);

                setSourceData(initialSourceData);
                props.history.replace(
                  `${props.match.url}${buildSearchParams({
                    type
                  })}`
                );
              }}
              text={mediaTypeText}
            />
          </div>
          <Button
            className="latest-page__refresh-button"
            aria-label="Refresh data"
            icon={Icons.circleArrow}
            onClick={() => dispatch({ type: REFRESH })}
          />
        </h2>
      </StickyHeader>
      <Grid
        className="latest-page__content-grid"
        items={state.results}
        isLoading={state.isLoading}
        onLoadMore={handleLoadMore}
      >
        {(item) => <ContentItem key={item.id} isLatest content={item} />}
      </Grid>
    </div>
  );
}

export default LatestPage;
