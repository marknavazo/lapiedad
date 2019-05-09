import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../../constants/routes';

// TEXTS
import GENERALTEXT from '../../../texts/generaltext';
import MENU from '../../../texts/menu';

const Footer = () => {
  return (
    <footer>
      <div className="container text-center">
        <NavLink exact to={ROUTES.HOME}>
          <h3 dangerouslySetInnerHTML={{ __html: GENERALTEXT.TITLE }} />
        </NavLink>
        <div className="row">
          <div className="col-md-12 text-center">+34666666666 · mail@mail.com</div>
        </div>
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
};

export default Footer;
