import classNames from 'classnames';
import React from 'react';

import { Button } from 'components/Button';

import service from 'utils/alertService';
import Icons from 'constants/icons';

import './Alert.scss';

const AlertMessage = ({
  id,
  type,
  message,
  detail,
  expandDetail,
  remove,
  isExpanded,
  className
}) => (
  <div className={classNames('alert', type, className)}>
    <div className={classNames('alert-content', { 'is-expanded': isExpanded })}>
      <div className={classNames('alert-top-content')}>
        <div className={classNames('alert-icon')} />
        <div className={classNames('alert-title')}>{message}</div>
        <div className="button-group">
          {detail && !isExpanded && (
            <Button onClick={() => expandDetail(id)}>Details</Button>
          )}
          <Button
            className={classNames('close')}
            aria-label="Close Alert"
            icon={Icons.cross}
            onClick={() => remove(id)}
          />
        </div>
      </div>
      <div className={classNames('alert-details')}>{detail}</div>
    </div>
  </div>
);

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      expandedAlerts: []
    };

    this.triggerAlert = this.triggerAlert.bind(this);
    this.handleShowDetail = this.handleShowDetail.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentDidMount() {
    service.register(this);
  }

  triggerAlert(alert) {
    this.setState({ alerts: [alert] }, () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (this.state.alerts.length) {
          this.setState({ alerts: [] });
        }
      }, 7500);
    });
  }

  handleShowDetail(alertId) {
    this.setState({ expandedAlerts: [alertId] });
  }

  handleDismiss(alertId) {
    this.setState((prev) => ({
      alerts: prev.alerts.filter((x) => x.id !== alertId)
    }));
  }

  render() {
    const { alerts, expandedAlerts } = this.state;
    const { id } = this.props;

    if (!alerts.length) {
      return null;
    }

    return (
      <div id={id} className={classNames('alert-container')}>
        {alerts.slice(0, 1).map((a) => (
          <AlertMessage
            key={a.id}
            {...a}
            isExpanded={expandedAlerts.includes(a.id)}
            expandDetail={this.handleShowDetail}
            remove={this.handleDismiss}
          />
        ))}
      </div>
    );
  }
}

export default Alert;
