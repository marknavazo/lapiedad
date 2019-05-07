import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants'; 

class Navigation extends Component {

  render() {
    return (
      <header>
        <div className="container">
          <NavLink exact={true} to={ROUTES.HOME}>
            <h1>CASA RURAL LA PIEDAD</h1>
          </NavLink>
          <nav id="top-menu">
            <ul>
              <li>
                <NavLink exact={true} to={ROUTES.HOME} activeClassName='selected'>Inicio</NavLink>
              </li>
              <li>
                <NavLink exact={true} to={ROUTES.GALLERY} activeClassName='selected'>Galería</NavLink>
              </li>
              <li>
                <NavLink exact={true} to={ROUTES.CONTACT} activeClassName='selected'>Contacto</NavLink>
              </li>
              <li>
                <NavLink exact={true} to={ROUTES.LOCALIZATION} activeClassName='selected'>Localización</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Navigation;
