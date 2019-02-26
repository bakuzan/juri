import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import Strings from 'constants/strings';
import { isString } from 'utils';

import './Grid.scss';

const Grid = ({ className, items, noItemsText, children, ...other }) => {
  const passedNothing = !items;
  const hasItems = !passedNothing && items.length > 0;
  const displayNoItemsText = !!noItemsText;
  const noItemsTextToRender = isString(noItemsText)
    ? noItemsText
    : Strings.noItemsAvailable;

  return (
    <ul className={classNames('grid', className)} {...other}>
      {!passedNothing && !hasItems && displayNoItemsText && (
        <li key="NONE">{noItemsTextToRender}</li>
      )}
      {hasItems && items.map(children)}
    </ul>
  );
};

Grid.defaultProps = {
  noItemsText: true
};

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  noItemsText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.func.isRequired
};

export default Grid;
