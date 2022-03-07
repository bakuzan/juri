import React, { useReducer, useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import { capitalise } from 'ayaka/capitalise';
import generateUniqueId from 'ayaka/generateUniqueId';
import { Button } from 'meiko/Button';
import SelectBox from 'meiko/SelectBox';
import ScrollTopButton from 'meiko/ScrollTopButton';
import ToggleBox from 'components/ToggleBox';
import ContentItem from 'components/ContentItem';
import Grid from 'components/Grid';
import StickyHeader from 'components/StickyHeader';
import NewTabLink from 'components/NewTabLink';
import OpenInNewTabIcon from 'components/OpenInNewTabIcon';

import Query from 'juriGQL';
import { getSources, getContentLatest } from 'juriGQL/queries';
import SourceType from 'constants/sourceTypes';
import Icons from 'constants/icons';
import { mediaTypeText } from 'constants/searchFilters';
import { useStorage } from 'hooks/useStorage';

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

async function fetchSources(setSourceData, { type }) {
  const { sources = [] } = await Query({
    query: getSources,
    variables: {
      sourceType: SourceType.latest,
      mediaType: capitalise(type)
    }
  });

  setSourceData(sources);
}

async function fetchContentResults(dispatch, params) {
  dispatch({ type: LOADING_SOURCE, sourceId: params.sourceId });
  const { latest = [] } = await Query({
    query: getContentLatest,
    variables: {
      ...params
    }
  });

  dispatch({ type: LOAD, latest, sourceId: params.sourceId });
}

const initialSourceData = { sources: [], sourceId: 0 };

const LOADING = 'loading';
const LOADING_SOURCE = 'loading-source';
const LOAD = 'load';
const REFRESH = 'refresh';
const LOAD_MORE = 'load-more';

function latestReducer(state, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loadingSource: action.sourceId, page: 1, results: [] };
    case LOADING_SOURCE:
      return { ...state, loadingSource: action.sourceId };
    case LOAD: {
      if (action.sourceId !== state.loadingSource) {
        return state;
      }

      return {
        ...state,
        loadingSource: null,
        results:
          state.page === 1
            ? action.latest
            : [...state.results, ...action.latest]
      };
    }
    case REFRESH:
      return {
        ...state,
        page: 1,
        refreshKey: generateUniqueId(),
        results: [],
        loadingSource: action.sourceId
      };
    case LOAD_MORE: {
      return state.loadingSource !== null
        ? state
        : { ...state, page: state.page + 1, loadingSource: action.sourceId };
    }
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
    loadingSource: null,
    page: 1,
    results: []
  });

  const latestSourcesForType = latestDefaultSources[type];
  const isLoading = state.loadingSource !== null;
  const sourceId = sourceData.sourceId;

  useEffect(() => {
    function setSourceInformation(sources) {
      const resolvedId = Number(
        resolveLatestSourceId(sources, latestSourcesForType)
      );
      setLatestDefaultSources({ [type]: resolvedId });
      setSourceData({ sources, sourceId: resolvedId });
    }

    dispatch({ type: LOADING, sourceId: 0 });
    fetchSources(setSourceInformation, { type });
  }, [type, setLatestDefaultSources, latestSourcesForType]);

  useEffect(() => {
    if (sourceId) {
      fetchContentResults(dispatch, {
        sourceId,
        page: state.page
      });
    }
  }, [sourceId, state.page, state.refreshKey]);

  const siteOptions = sourceData.sources.map((o) => ({
    value: o.id,
    text: o.name
  }));

  const disableSiteChanger = siteOptions.length < 2;
  const activeSite = sourceData.sources.find((x) => x.id === sourceId);

  const activeSiteOrigin = (activeSite && activeSite.estimatedSiteUrl) || null;
  const hasPaging = (activeSite && activeSite.isPaged) || false;

  const handleLoadMore = useCallback(() => {
    if (hasPaging) {
      dispatch({ type: LOAD_MORE, sourceId });
    }
  }, [hasPaging, sourceId]);

  return (
    <div className="latest-page">
      <Helmet title="Latest" />
      <StickyHeader>
        {(isFixed) => (
          <h2 className="latest-page__header">
            <SelectBox
              id="site"
              name="site"
              text="Site"
              value={sourceId}
              options={siteOptions}
              onChange={(event) => {
                const sourceId = Number(event.target.value);
                dispatch({ type: LOADING, sourceId });
                setLatestDefaultSources({ [type]: sourceId });
                setSourceData((prev) => ({ ...prev, sourceId }));
              }}
              disabled={disableSiteChanger}
            />
            {activeSiteOrigin && (
              <NewTabLink className="site-origin" to={activeSiteOrigin}>
                <OpenInNewTabIcon
                  alt={`Open ${activeSite.name} origin in new tab.`}
                />
              </NewTabLink>
            )}
            <div className="center-contents latest-page__title">
              Latest releases for
              <ToggleBox
                name="isAnime"
                label="Is anime"
                checked={isAnime}
                handleChange={(_, value) => {
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
              btnStyle={isFixed ? 'primary' : null}
              aria-label="Refresh data"
              icon={Icons.circleArrow}
              onClick={() => dispatch({ type: REFRESH, sourceId })}
            />
          </h2>
        )}
      </StickyHeader>
      <Grid
        className="latest-page__content-grid"
        items={state.results}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
      >
        {(item) => <ContentItem key={item.id} isLatest content={item} />}
      </Grid>
      <ScrollTopButton />
    </div>
  );
}

export default LatestPage;
