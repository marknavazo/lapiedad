import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';
import { ROUTES } from '../../../constants';

// TEXTS
import { GENERAL, MENU } from '../../../texts';

class Navigation extends Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <header>
        <Menu right>
          <NavLink className="menu-item" exact to={ROUTES.HOME} activeClassName="selected">
            {MENU.HOME}
          </NavLink>
          <NavLink className="menu-item" exact to={ROUTES.GALLERY} activeClassName="selected">
            {MENU.GALLERY}
          </NavLink>
          <NavLink className="menu-item" exact to={ROUTES.CONTACT} activeClassName="selected">
            {MENU.CONTACT}
          </NavLink>
          <NavLink className="menu-item" exact to={ROUTES.LOCALIZATION} activeClassName="selected">
            {MENU.LOCALIZATION}
          </NavLink>
        </Menu>
        <div className="container">
          <NavLink exact to={ROUTES.HOME}>
            <h1 dangerouslySetInnerHTML={{ __html: GENERAL.TITLE }} />
          </NavLink>
          <nav id="top-menu">
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
      </header>
    );
  }
}

export default Navigation;
