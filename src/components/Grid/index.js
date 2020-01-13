import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useState, useEffect } from 'react';

import isString from 'ayaka/isString';
import LoadingBouncer from 'meiko/LoadingBouncer';
import { useProgressiveLoading } from 'meiko/hooks/useProgressiveLoading';

import Strings from 'constants/strings';

import './Grid.scss';
import { usePrevious } from 'meiko/hooks/usePrevious';

function Grid({
  className,
  items,
  noItemsText,
  children,
  isLoading,
  onLoadMore,
  showCount,
  ...other
}) {
  const ref = useProgressiveLoading(onLoadMore);
  const [isReady, setReady] = useState(false);
  const prevLoading = usePrevious(isLoading);

  useEffect(() => {
    const changed = isLoading !== prevLoading;
    if (changed) {
      setReady(isLoading);
    }
  }, [isLoading, prevLoading, isReady]);

  const passedNothing = !items;
  const hasItems = !passedNothing && items.length > 0;
  const displayNoItemsText = !!noItemsText && !isLoading && !showCount;
  const noItemsTextToRender = isString(noItemsText)
    ? noItemsText
    : Strings.noItemsAvailable;

  return (
    <div className="progressive-grid">
      {!passedNothing && !hasItems && displayNoItemsText && (
        <div className="progressive-grid__no-items">{noItemsTextToRender}</div>
      )}
      {!passedNothing && showCount && (
        <div className="progressive-grid__count">
          Showing {items.length} item(s)
        </div>
      )}
      <ul
        ref={ref}
        className={classNames('progressive-grid__grid', className)}
        {...other}
      >
        {hasItems && items.map(children)}
      </ul>
      {isReady && <LoadingBouncer />}
    </div>
  );
}

Grid.defaultProps = {
  noItemsText: true,
  showCount: false
};

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  showCount: PropTypes.bool,
  noItemsText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onLoadMore: PropTypes.func
};

export default Grid;
