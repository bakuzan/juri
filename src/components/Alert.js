import React, { useState, useEffect, useRef } from 'react';

import { Alert } from 'mko';
import service from 'utils/alertService';

function JriAlert({ ...props }) {
  const [alerts, setAlerts] = useState([]);
  const timer = useRef();

  function handleDismiss() {
    setAlerts([]);
  }

  useEffect(() => {
    function triggerAlert(alert) {
      setAlerts([alert]);

      clearTimeout(timer.current);
      timer.current = setTimeout(handleDismiss, 7500);
    }

    service.register(triggerAlert);
  }, []);

  if (!alerts.length) {
    return null;
  }

  return (
    <Alert
      {...props}
      alerts={alerts}
      actions={{ dismissAlertMessage: handleDismiss }}
    />
  );
}

export default JriAlert;
