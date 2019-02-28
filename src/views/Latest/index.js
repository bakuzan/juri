import React, { useState, useEffect } from 'react';

import ToggleBox from 'components/ToggleBox';
import SelectBox from 'components/SelectBox';
import ContentItem from 'components/ContentItem';
import Grid from 'components/Grid';
import { Button } from 'components/Button';

import Query from 'juriGQL';
import { getSources, getContentLatest } from 'juriGQL/queries';
import SourceType from 'constants/sourceTypes';
import Icons from 'constants/icons';
import { mediaTypeText } from 'constants/searchFilters';
import useStorage from 'hooks/useStorage';
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

async function fetchContentResults(setState, params) {
  const result = { data: { latest: [] } };
  // const result = await Query({
  //   query: getContentLatest,
  //   variables: {
  //     ...params
  //   }
  // });
  const { latest } = result.data || {};
  console.log('LatestPage > Queried! > ', params, result);
  setState((prev) => ({
    ...prev,
    isLoading: false,
    results: params.page === 1 ? latest : [...prev.latest, ...latest]
  }));
}

const initialSourceData = { sources: [], sourceId: 0 };

function LatestPage({ location, ...props }) {
  const { isAnime, type } = getFilterFlags(location);
  const [latestDefaultSources, setLatestDefaultSources] = useStorage('latest');
  const [sourceData, setSourceData] = useState(initialSourceData);
  const [state, setState] = useState({
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

    fetchSources(setSourceInformation, { type, latestDefaultSources });
  }, [type]);

  useEffect(() => {
    if (sourceData.sourceId) {
      fetchContentResults(setState, {
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
  const activeSite = siteOptions.find((x) => x.value === sourceData.sourceId);
  const hasPaging = activeSite && activeSite.isPaged;
  const handleLoadMore = hasPaging
    ? function onLoadMore() {
        if (state.isLoading) {
          return;
        }

        setState((prev) => ({ ...prev, page: prev.page + 1, isLoading: true }));
      }
    : null;

  console.log(latestDefaultSources);
  return (
    <div className="latest-page">
      <h2 className="latest-page__header">
        <SelectBox
          name="site"
          text="Site"
          value={sourceData.sourceId}
          options={siteOptions}
          onSelect={(event) => {
            const sourceId = Number(event.target.value);
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
          onClick={() =>
            setState((prev) => ({
              ...prev,
              page: 1,
              refreshKey: generateUniqueId()
            }))
          }
        />
      </h2>
      <Grid
        className="latest-page__content-grid"
        items={state.results}
        isLoading={state.isLoading}
        onLoadMore={handleLoadMore}
      >
        {(item) => <ContentItem key={item.id} content={item} />}
      </Grid>
    </div>
  );
}

export default LatestPage;
