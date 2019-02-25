import Strings from 'constants/strings';

export default {
  DEFAULTS: {},
  get() {
    return JSON.parse(localStorage.getItem(Strings.localSettings)) || DEFAULTS;
  },
  save() {
    const values = this.get();
    const updated = { ...values, ...newValues };
    localStorage.setItem(Strings.localSettings, JSON.stringify(updated));
    return updated;
  }
};
