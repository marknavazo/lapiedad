import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

// TEXTS
import MENU from '../../../texts/menu';

const Menuoptions = () => {
  return (
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
  );
};

export default Menuoptions;
