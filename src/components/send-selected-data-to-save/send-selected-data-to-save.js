import React from 'react';

var searchData = {};

const mapContentItem = item =>
  item ? { link: item.href, title: item.title, image: item.image } : null;

const mapMalItem = item =>
  item ? { malId: item.id, title: item.title, image: item.image } : null;

class SendSelectedDataToSave extends React.Component {
  constructor(props) {
    super(props);

    this.handleSendData = this.handleSendData.bind(this);
  }
  handleSendData() {
    const { malItem, contentItem } = this.props.selectedItems;
    searchData = {
      contentData: mapContentItem(contentItem),
      malData: mapMalItem(malItem)
    };
    // TODO
    // need to pass type to this component
    // open window to erza here!
  }
  render() {
    const hasSelected = Object.keys(this.props.selectedItems).some(
      k => !!this.props.selectedItems[k]
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
export default SendSelectedDataToSave;
