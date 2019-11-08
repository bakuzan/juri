import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';

import { Button } from 'meiko/Button';
import LoadingBouncer from 'meiko/LoadingBouncer';
import Tickbox from 'meiko/Tickbox';
import ContentItem from '../ContentItem';
import Grid from 'components/Grid';

import { SourceContext, SearchContext } from 'context';

import './SearchResult.scss';

function SearchResult({
  isLoading,
  sourceId,
  primarySourceId,
  results,
  onSelectPrimarySource
}) {
  const [sources] = useContext(SourceContext);
  const { type, isAdult, dispatch: searchDispatch } = useContext(SearchContext);
  const [collapsedSources, setCollapsedSources] = useState([]);
  const hasResults = !!results.size;

  useEffect(() => {
    setCollapsedSources([]);
  }, [type, isAdult]);

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
            const isCollapsed = collapsedSources.includes(src.id);

            return (
              <li key={src.id} className="search-source">
                <div className="search-source__title">
                  <button
                    type="button"
                    className={classNames('search-source__accordion-toggle', {
                      'search-source__accordion-toggle--checked': isCollapsed
                    })}
                    onClick={() =>
                      setCollapsedSources((cs) =>
                        cs.includes(src.id)
                          ? cs.filter((x) => x !== src.id)
                          : [...cs, src.id]
                      )
                    }
                  >
                    {src.name}
                  </button>
                  <Tickbox
                    id="isPrimary"
                    containerClassName="search-source__is-primary"
                    name="isPrimary"
                    aria-label="Is primary"
                    title="Is Primary"
                    text=""
                    checked={src.id === primarySourceId}
                    onChange={() => onSelectPrimarySource(src.id)}
                  />
                </div>
                <div
                  aria-hidden={isCollapsed}
                  className={classNames('search-source__content', {
                    'search-source__content--collapsed': isCollapsed
                  })}
                >
                  {!hasSearched &&
                    (isLoading && isCurrentSource ? (
                      <LoadingBouncer />
                    ) : (
                      <div className="search-source__query-trigger">
                        <Button
                          btnStyle="primary"
                          onClick={() =>
                            searchDispatch({ type: 'source', sourceId: src.id })
                          }
                        >
                          Search {src.name}
                        </Button>
                      </div>
                    ))}
                  {hasSearched && (
                    <Grid
                      className="search-results__content-grid"
                      items={items}
                    >
                      {(item) => {
                        return <ContentItem key={item.id} content={item} />;
                      }}
                    </Grid>
                  )}
                </div>
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
  primarySourceId: PropTypes.number.isRequired,
  results: PropTypes.object, // a Map([])
  onSelectPrimarySource: PropTypes.func.isRequired
};

export default SearchResult;
