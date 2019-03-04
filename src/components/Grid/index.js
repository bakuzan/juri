import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { useRef } from 'react';

import LoadingBouncer from 'components/LoadingBouncer';

import Strings from 'constants/strings';
import { useProgressiveLoading } from 'hooks/useProgressiveLoading';
import { isString } from 'utils';

import './Grid.scss';

function Grid({
  className,
  items,
  noItemsText,
  children,
  isLoading,
  isPaged,
  onLoadMore,
  ...other
}) {
  const ref = useRef();
  useProgressiveLoading(ref, onLoadMore);

  const passedNothing = !items;
  const hasItems = !passedNothing && items.length > 0;
  const displayNoItemsText = !!noItemsText && !isLoading;
  const noItemsTextToRender = isString(noItemsText)
    ? noItemsText
    : Strings.noItemsAvailable;

  return (
    <ul ref={ref} className={classNames('grid', className)} {...other}>
      {!passedNothing && !hasItems && displayNoItemsText && (
        <li key="NONE">{noItemsTextToRender}</li>
      )}
      {hasItems && items.map(children)}
      {isLoading && <LoadingBouncer />}
    </ul>
  );
}

Grid.defaultProps = {
  noItemsText: true
};

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  noItemsText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onLoadMore: PropTypes.func
};

export default Grid;
