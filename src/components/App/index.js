import React from 'react';
import { NavLink } from 'react-router-dom';

import Header from 'components/Header';
import SVGLogo from 'components/SVGLogo';
import Alert from 'components/Alert';

import Paths from 'constants/paths';

const headerLinks = [
  { text: 'Search', to: '' },
  { text: 'Latest', to: Paths.latest }
];

function App(props) {
  return (
    <div className="juri">
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
