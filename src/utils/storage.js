import Strings from 'constants/strings';

export default {
  DEFAULTS: {
    isDarkTheme: false,
    latest: {
      anime: 0,
      manga: 0
    }
  },
  get() {
    return (
      JSON.parse(localStorage.getItem(Strings.localSettings)) || this.DEFAULTS
    );
  },
  set(newValues) {
    const values = this.get();
    const updated = { ...values, ...newValues };
    localStorage.setItem(Strings.localSettings, JSON.stringify(updated));
    return updated;
  }
};
