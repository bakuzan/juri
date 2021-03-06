import { useState, useCallback } from 'react';

import storage from 'utils/storage';

export function useStorage(key) {
  const setting = storage.getKey(key);
  const [value, setState] = useState(setting);

  const setWrappedState = useCallback(
    (newValue) => {
      const isObject = typeof newValue === 'object';
      const currentSetting = storage.getKey(key);

      const data = isObject
        ? { [key]: { ...currentSetting, ...newValue } }
        : { [key]: newValue };

      const updated = storage.set(data)[key];
      setState(updated);
    },
    [key]
  );

  return [value, setWrappedState];
}
