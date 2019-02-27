import React, { useContext } from 'react';

import RadioToggle from 'components/RadioToggle';

import Themes from 'constants/themes';
import Icons from 'constants/icons';
import { ThemeContext } from 'context';

const appThemes = [...Themes.values()];

function AppSettings() {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <RadioToggle
      name="theme"
      icons={[Icons.moon, Icons.sun]}
      checked={theme}
      onChange={(v) => {
        const newTheme = Themes.get(v);
        setTheme(newTheme.value);
      }}
    />
  );
}

export default AppSettings;
