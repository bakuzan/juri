import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';

import Header from 'components/Header';
import SVGLogo from 'components/SVGLogo';
import Alert from 'components/Alert';
import RadioToggle from 'components/RadioToggle';

import Paths from 'constants/paths';
import Icons from 'constants/icons';
import useStorage from 'hooks/useStorage';

const headerLinks = [
  { text: 'Search', to: '', exact: true },
  { text: 'Latest', to: Paths.latest },
  { text: 'Manage', to: Paths.manage }
];

function App(props) {
  const [isDarkTheme, setTheme] = useStorage('isDarkTheme');

  return (
    <div
      className={classNames('juri', {
        theme: true,
        'theme--light': !isDarkTheme,
        'theme--dark': isDarkTheme
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
              name="theme"
              icons={[Icons.moon, Icons.sun]}
              checked={isDarkTheme}
              onChange={setTheme}
            />
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
