import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../../constants';

// TEXTS
import { GENERAL, MENU } from '../../../texts';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container text-center">
          <NavLink exact to={ROUTES.HOME}>
            <h3 dangerouslySetInnerHTML={{ __html: GENERAL.TITLE }} />
          </NavLink>
          <nav id="footer-menu">
            <ul>
              <li>
                <NavLink exact to={ROUTES.HOME} activeClassName="selected">
                  {MENU.HOME}
                </NavLink>
              </li>
              <li>
                <NavLink exact to={ROUTES.GALLERY} activeClassName="selected">
                  {MENU.GALLERY}
                </NavLink>
              </li>
              <li>
                <NavLink exact to={ROUTES.CONTACT} activeClassName="selected">
                  {MENU.CONTACT}
                </NavLink>
              </li>
              <li>
                <NavLink exact to={ROUTES.LOCALIZATION} activeClassName="selected">
                  {MENU.LOCALIZATION}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    );
  }
}

export default Footer;
