import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'components/Button';

const BASE_URL = process.env.REACT_APP_ERZA_BASE_URL;

const mapContentItem = (item) =>
  item ? { link: item.href, title: item.title, image: item.image } : {};

const mapSelectedToData = (contentItem) => ({
  ...mapContentItem(contentItem)
});

function SendSelectedDataToSave(props) {
  const hasSelected = !!props.selectedItem;

  return (
    <div className="send-data">
      <Button
        btnStyle="accent"
        disabled={!hasSelected}
        onClick={() => {
          const { type, isAdult, selectedItem } = props;
          const searchData = mapSelectedToData(selectedItem);
          const searchStr = Object.keys(searchData).reduce((p, c, i) => {
            const join = i > 0 ? '&' : '';
            const value = searchData[c] || '';
            return `${p}${join}${c}=${value}`;
          }, '');

          window.open(
            `${BASE_URL}/${type}/create?isAdult=${isAdult}&${searchStr}`,
            '_blank'
          );
        }}
      >
        Add to list
      </Button>
    </div>
  );
}

SendSelectedDataToSave.propTypes = {
  type: PropTypes.string.isRequired,
  isAdult: PropTypes.bool.isRequired,
  selectedItem: PropTypes.object
};

export default SendSelectedDataToSave;
