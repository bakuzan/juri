import React from 'react';
import { NavLink } from 'react-router-dom';

import Header from 'components/Header';
import SVGLogo from 'components/SVGLogo';
import Paths from 'constants/paths';

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
      />
      <main>{props.children}</main>
    </div>
  );
}

export default App;
