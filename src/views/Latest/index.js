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
import { capitalise, generateUniqueId } from 'utils';
import {
  buildSearchParams,
  getFilterFlags,
  getTypeFromBool
} from 'utils/searchParams';

import './Latest.scss';

async function fetchSources(setSourceData, type) {
  const result = await Query({
    query: getSources,
    variables: {
      sourceType: SourceType.latest,
      mediaType: capitalise(type)
    }
  });

  const { sources } = result.data || {};
  setSourceData({ sources, sourceId: sources ? sources[0].id : 0 });
}

async function fetchContentResults(setState, params) {
  const result = await Query({
    query: getContentLatest,
    variables: {
      ...params
    }
  });
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
  const { isAnime, type: currentType } = getFilterFlags(location);
  const [sourceData, setSourceData] = useState(initialSourceData);
  const [state, setState] = useState({
    refreshKey: generateUniqueId(),
    isLoading: true,
    page: 1,
    results: []
  });

  useEffect(() => {
    fetchSources(setSourceData, currentType);
  }, [currentType]);

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

  return (
    <div className="latest-page">
      <h2 className="latest-page__header">
        <SelectBox
          name="site"
          text="Site"
          value={sourceData.sourceId}
          options={siteOptions}
          onSelect={(event) => {
            const sourceId = event.target.value;
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
