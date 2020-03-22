import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from 'meiko/Header';
import RadioToggle from 'meiko/RadioToggle';
import SVGLogo from 'meiko/Logo';
import { useGlobalStyles } from 'meiko/hooks/useGlobalStyles';
import Alert from 'components/Alert';

import { ThemeContext } from 'context';
import Paths from 'constants/paths';
import Icons from 'constants/icons';
import { useStorage } from 'hooks/useStorage';

const headerLinks = [
  { text: 'Search', to: '', exact: true },
  { text: 'Latest', to: Paths.latest },
  { text: 'r/Manga', to: Paths.redditManga },
  { text: 'Manage', to: Paths.manage, exact: true }
];

function App(props) {
  const [isDarkTheme, setTheme] = useStorage('isDarkTheme');
  useGlobalStyles();

  return (
    <HelmetProvider>
      <div
        className={classNames('juri', {
          theme: true,
          'theme--light': !isDarkTheme,
          'theme--dark': isDarkTheme
        })}
      >
        <Helmet defaultTitle="Juri" titleTemplate="%s | Juri" />
        <Header
          leftAlignTitle
          title="Juri"
          navLeft={
            <NavLink className="logo svg-link" to={Paths.base}>
              <SVGLogo text="Juri" />
            </NavLink>
          }
          navRight={
            <React.Fragment>
              {headerLinks.map(({ text, to, ...other }) => (
                <NavLink
                  key={text}
                  className="application-header__link"
                  to={`${Paths.base}${to}`}
                  {...other}
                >
                  {text}
                </NavLink>
              ))}
              <RadioToggle
                className="theme-toggle"
                label="Switch between Dark and Light mode"
                name="theme"
                icons={[Icons.moon, Icons.sun]}
                checked={isDarkTheme}
                onChange={setTheme}
              />
            </React.Fragment>
          }
        />
        <ThemeContext.Provider value={[isDarkTheme, setTheme]}>
          <main>
            <Alert />
            {props.children}
          </main>
        </ThemeContext.Provider>
      </div>
    </HelmetProvider>
  );
}

export default App;
