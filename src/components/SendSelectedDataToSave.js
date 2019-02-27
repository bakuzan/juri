import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'components/Button';

const mapContentItem = (item) =>
  item ? { link: item.href, title: item.title, image: item.image } : {};

const mapSelectedToData = (contentItem) => ({
  ...mapContentItem(contentItem)
});

class SendSelectedDataToSave extends React.Component {
  constructor(props) {
    super(props);

    this.handleSendData = this.handleSendData.bind(this);
  }

  handleSendData() {
    const { type, isAdult, selectedItem } = this.props;
    const searchData = mapSelectedToData(selectedItem);
    const searchStr = Object.keys(searchData).reduce((p, c, i) => {
      const join = i > 0 ? '&' : '';
      const value = searchData[c] || '';
      return `${p}${join}${c}=${value}`;
    }, '');

    window.open(
      `${
        process.env.REACT_APP_ERZA_BASE_URL
      }/${type}/create?isAdult=${isAdult}&${searchStr}`,
      '_blank'
    );
  }

  render() {
    const hasSelected = !!this.props.selectedItem;

    return (
      <div className="send-data">
        <Button
          btnStyle="primary"
          onClick={this.handleSendData}
          disabled={!hasSelected}
        >
          Add to list
        </Button>
      </div>
    );
  }
}

SendSelectedDataToSave.propTypes = {
  type: PropTypes.string.isRequired,
  isAdult: PropTypes.bool.isRequired,
  selectedItem: PropTypes.object
};

export default SendSelectedDataToSave;
