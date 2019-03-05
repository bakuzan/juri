import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import ContentItem from '../ContentItem';
import Grid from 'components/Grid';
import { Button } from 'components/Button';
import LoadingBouncer from 'components/LoadingBouncer';

import { SourceContext } from 'context';

import './SearchResult.scss';

function SearchResult({ isLoading, sourceId, results, onSelectSource }) {
  const [sources] = useContext(SourceContext);
  const hasResults = !!results.size;

  return (
    <div className="search-results">
      {!hasResults && isLoading && (
        <LoadingBouncer className="search-results__loader" />
      )}
      {hasResults && (
        <Grid className="search-results__sources" items={sources}>
          {(src) => {
            const items = results.get(src.id);
            const hasSearched = !!items;
            const isCurrentSource = sourceId === src.id;

            return (
              <li key={src.id} className="search-source">
                <div className="search-source__title">{src.name}</div>
                {!hasSearched &&
                  (isLoading && isCurrentSource ? (
                    <LoadingBouncer />
                  ) : (
                    <div className="search-source__query-trigger">
                      <Button
                        btnStyle="primary"
                        onClick={() => onSelectSource(src.id)}
                      >
                        Search {src.name}
                      </Button>
                    </div>
                  ))}
                {hasSearched && (
                  <Grid className="search-results__content-grid" items={items}>
                    {(item) => {
                      return <ContentItem key={item.id} content={item} />;
                    }}
                  </Grid>
                )}
              </li>
            );
          }}
        </Grid>
      )}
    </div>
  );
}

SearchResult.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  sourceId: PropTypes.number.isRequired,
  results: PropTypes.object, // a Map([])
  onSelectSource: PropTypes.func.isRequired
};

export default SearchResult;
