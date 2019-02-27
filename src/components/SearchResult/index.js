import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import ContentItem from '../ContentItem';
import Grid from 'components/Grid';
import { Button } from 'components/Button';
import LoadingBouncer from 'components/LoadingBouncer';

import { SourceContext } from 'context';

import './SearchResult.scss';

function SearchResult({
  isLoading,
  results,
  selectedItem,
  onSelectItem,
  onSelectSource
}) {
  const [sources] = useContext(SourceContext);
  const hasResults = !!results.size;
  console.log('Render Search Results', sources, results);
  return (
    <div className="search-results">
      {!hasResults && isLoading && <LoadingBouncer />}
      {hasResults && (
        <Grid className="search-results__sources" items={sources}>
          {(src) => {
            const items = results.get(src.id);
            const hasSearched = !!items;

            return (
              <li key={src.id} className="search-source">
                <div className="search-source__title">{src.name}</div>
                {!hasSearched &&
                  (isLoading ? (
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
                      return (
                        <ContentItem
                          key={item.id}
                          content={item}
                          isSelected={
                            selectedItem && selectedItem.id === item.id
                          }
                          onClick={onSelectItem}
                        />
                      );
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
  results: PropTypes.object, // a Map([])
  selectedItem: PropTypes.object,
  onSelectItem: PropTypes.func.isRequired,
  onSelectSource: PropTypes.func.isRequired
};

export default SearchResult;
