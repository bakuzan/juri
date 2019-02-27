import React from 'react';
import { NavLink } from 'react-router-dom';

import Header from 'components/Header';
import SVGLogo from 'components/SVGLogo';
import Alert from 'components/Alert';
import ThemeToggle from 'components/ThemeToggle';

import Paths from 'constants/paths';

const headerLinks = [
  { text: 'Search', to: '', exact: true },
  { text: 'Latest', to: Paths.latest },
  { text: 'Manage', to: Paths.manage }
];

function App(props) {
  // TODO read theme from localStorage into useState
  const theme = 'one';
  const themeState = [];

  return (
    <div
      className={classNames('juri', {
        theme: true,
        [`theme--${theme}`]: !!theme
      })}
    >
      <Header
        title="Juri"
        navLeft={
          <NavLink className="logo svg-link" to={Paths.base}>
            <SVGLogo text="Juri" />
          </NavLink>
        }
        navRight={
          <React.Fragment>
            {headerLinks.map(({ text, ...other }) => (
              <NavLink
                key={text}
                className="application-header__link"
                {...other}
              >
                {text}
              </NavLink>
            ))}
            <ThemeContext.Provider value={themeState}>
              <ThemeToggle />
            </ThemeContext.Provider>
          </React.Fragment>
        }
      />

      <main>
        <Alert />
        {props.children}
      </main>
    </div>
  );
}

export default App;
