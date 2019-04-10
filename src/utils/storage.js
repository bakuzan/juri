import Storage from 'ayaka/localStorage';

import Strings from 'constants/strings';

const DEFAULTS = Object.freeze({
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
});

const s = new Storage(Strings.localSettings, DEFAULTS);

// Always apply latest DEFAULTS
s.upgrade((d) => ({ ...DEFAULTS, ...d }));

export default s;
