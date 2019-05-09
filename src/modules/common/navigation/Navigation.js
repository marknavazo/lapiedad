import React from 'react';
import { NavLink } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';
import parse from 'html-react-parser';
import ROUTES from '../../../constants/routes';
import Menuoptions from '../menuoptions/Menuoptions';

// TEXTS
import GENERALTEXT from '../../../texts/generaltext';
import MENU from '../../../texts/menu';

const Navigation = () => {
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
          <h1>{parse(GENERALTEXT.TITLE)}</h1>
        </NavLink>
        <nav id="top-menu">
          <Menuoptions />
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
