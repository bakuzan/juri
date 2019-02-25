import PropTypes from 'prop-types';
import React from 'react';

const mapContentItem = (item) =>
  item ? { link: item.href, title: item.title, image: item.image } : {};

const mapMalItem = (item) =>
  item ? { malId: item.id, title: item.title, image: item.image } : {};

const mapSelectedToData = (malItem, contentItem) => ({
  ...mapContentItem(contentItem),
  ...mapMalItem(malItem)
});

class SendSelectedDataToSave extends React.Component {
  constructor(props) {
    super(props);

    this.handleSendData = this.handleSendData.bind(this);
  }

  handleSendData() {
    const {
      type,
      isAdult,
      selectedItems: { malItem, contentItem }
    } = this.props;
    const searchData = mapSelectedToData(malItem, contentItem);
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
    const hasSelected = Object.keys(this.props.selectedItems).some(
      (k) => !!this.props.selectedItems[k]
    );

    return (
      <div className="flex align-end padding-5">
        <button
          type="button"
          className="button ripple primary"
          onClick={this.handleSendData}
          disabled={!hasSelected}
        >
          Add to list
        </button>
      </div>
    );
  }
}

SendSelectedDataToSave.propTypes = {
  type: PropTypes.string.isRequired,
  isAdult: PropTypes.bool.isRequired,
  selectedItems: PropTypes.shape({
    malItem: PropTypes.object,
    contentItem: PropTypes.object
  }).isRequired
};

export default SendSelectedDataToSave;
