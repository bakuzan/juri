import React, { useEffect, useState } from 'react';
import { NavLink as RRDNavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { withButtonisation } from 'components/Button';
import NavLink from 'components/NavLink';
import Grid from 'components/Grid';
import ClearableInput from 'components/ClearableInput';

import Query from 'juriGQL';
import { getSourcesList } from 'juriGQL/queries';

const ButtonisedLink = withButtonisation(RRDNavLink);

async function fetchSources(setState) {
  const result = await Query({
    query: getSourcesList,
    variables: {}
  });

  const { sources = [] } = result.data || {};
  setState(sources.reduce((p, c) => p.set(c.id, c), new Map()));
}

function ManageList({ match, sourceState, ...props }) {
  const [sourceMap, setSources] = sourceState;
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    fetchSources(setSources);
  }, []);

  const lowerSearchString = searchString.toLowerCase();
  const sources = [...sourceMap.values()].filter((x) =>
    x.name.toLowerCase().includes(lowerSearchString)
  );

  return (
    <div className="manage-page">
      <Helmet title="Manage Sources" />
      <div className="manage-page__actions">
        <ClearableInput
          autoFocus
          id="searchString"
          name="searchString"
          label="Filter"
          value={searchString}
          onChange={(e) => {
            const value = e.target.value;
            setSearchString(value);
          }}
        />
        <ButtonisedLink btnStyle="primary" to={`${match.url}/create`}>
          Add
        </ButtonisedLink>
      </div>
      <Grid className="manage-page__grid" items={sources} isLoading={false}>
        {(item) => (
          <li key={item.id} className="source-item">
            <div>
              <NavLink to={`${match.url}/${item.id}`}>{item.name}</NavLink>
            </div>
            <div className="source-item__reduced-text">{item.mediaType}</div>
            <div className="source-item__reduced-text">{item.sourceType}</div>
          </li>
        )}
      </Grid>
    </div>
  );
}

export default ManageList;
