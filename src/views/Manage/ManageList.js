import React, { useEffect, useState } from 'react';
import { NavLink as RRDNavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { withButtonisation } from 'meiko/Button';
import ClearableInput from 'meiko/ClearableInput';
import SelectBox from 'meiko/SelectBox';
import NavLink from 'components/NavLink';
import Grid from 'components/Grid';

import Icons from 'constants/icons';
import Query from 'juriGQL';
import { getSourcesList } from 'juriGQL/queries';
import { mediaTypes, sourceTypes } from './manageUtils';

import './ManageList.scss';

const ButtonisedLink = withButtonisation(RRDNavLink);

const mediaOptions = [{ text: 'All', value: '' }, ...mediaTypes];
const sourceOptions = [{ text: 'All', value: '' }, ...sourceTypes];

async function fetchSources(setState) {
  const result = await Query({
    query: getSourcesList,
    variables: {}
  });

  const { sources = [] } = result;
  setState(sources.reduce((p, c) => p.set(c.id, c), new Map()));
}

function ManageList({ match, sourceState }) {
  const [sourceMap, setSources] = sourceState;

  const [searchString, setSearchString] = useState('');
  const [sourceType, setSourceType] = useState('');
  const [mediaType, setMediaType] = useState('');

  useEffect(() => {
    fetchSources(setSources);
  }, [setSources]);

  const lowerSearchString = searchString.toLowerCase();
  const sources = [...sourceMap.values()].filter(
    (x) =>
      x.name.toLowerCase().includes(lowerSearchString) &&
      (!sourceType || x.sourceType === sourceType) &&
      (!mediaType || x.mediaType === mediaType)
  );

  return (
    <div className="manage-page">
      <Helmet title="Manage Sources" />
      <div className="manage-page__actions">
        <div className="manage-page__filters">
          <ClearableInput
            autoFocus
            id="searchString"
            containerClassName="manage-page__search"
            name="searchString"
            label="Filter sources"
            aria-label="Filter site sources on name"
            value={searchString}
            onChange={(e) => {
              const value = e.target.value;
              setSearchString(value);
            }}
          />
          <SelectBox
            className="manage-form__control"
            id="sourceType"
            name="sourceType"
            text="Source Type"
            value={sourceType}
            options={sourceOptions}
            onChange={(e) => setSourceType(e.target.value)}
            aria-label="Filter site sources on source type"
          />
          <SelectBox
            className="manage-form__control"
            id="mediaType"
            name="mediaType"
            text="Media Type"
            value={mediaType}
            options={mediaOptions}
            onChange={(e) => setMediaType(e.target.value)}
            aria-label="Filter site sources on media type"
          />
        </div>
        <ButtonisedLink btnStyle="primary" to={`${match.url}/create`}>
          Add
        </ButtonisedLink>
      </div>
      <Grid
        className="manage-page__grid"
        items={sources}
        isLoading={false}
        showCount
      >
        {(item) => {
          const stateLabel = `Source is ${
            item.isActive ? 'active' : 'disabled'
          }`;

          return (
            <li key={item.id} className="source-item">
              <div className="source-item__content">
                <NavLink to={`${match.url}/${item.id}`}>{item.name}</NavLink>

                <div className="source-item__reduced-text">
                  {item.mediaType}
                </div>
                <div className="source-item__reduced-text">
                  {item.sourceType}
                </div>
              </div>
              <div className="source-item__states">
                <div
                  className="source-item__active"
                  aria-label={stateLabel}
                  title={stateLabel}
                >
                  <span aria-hidden={true}>
                    {item.isActive ? Icons.tick : Icons.cross}
                  </span>
                </div>
                {item.isAdult && (
                  <div
                    className="source-item__adult"
                    aria-label="Source contains adult content"
                    title="Source contains adult content"
                  >
                    <span aria-hidden={true}>18+</span>
                  </div>
                )}
              </div>
            </li>
          );
        }}
      </Grid>
    </div>
  );
}

export default ManageList;
