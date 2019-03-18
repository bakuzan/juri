import Strings from 'constants/strings';

export default {
  DEFAULTS: {
    isDarkTheme: false,
    latest: {
      anime: 0,
      manga: 0
    },
    search: {
      anime_false: 0,
      manga_false: 0,
      anime_true: 0,
      manga_true: 0
    }
  },
  get() {
    const values =
      JSON.parse(localStorage.getItem(Strings.localSettings)) || this.DEFAULTS;

    return { ...this.DEFAULTS, ...values };
  },
  set(newValues) {
    const values = this.get();
    const updated = { ...values, ...newValues };
    localStorage.setItem(Strings.localSettings, JSON.stringify(updated));
    return updated;
  }
};
