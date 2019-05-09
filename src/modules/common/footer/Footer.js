import React from 'react';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import ROUTES from '../../../constants/routes';
import Menuoptions from '../menuoptions/Menuoptions';

// TEXTS
import GENERALTEXT from '../../../texts/generaltext';

const Footer = () => {
  return (
    <footer>
      <div className="container text-center">
        <NavLink exact to={ROUTES.HOME}>
          <h3>{parse(GENERALTEXT.TITLE)}</h3>
        </NavLink>
        <div className="row">
          <div className="col-md-12 text-center">
            +34666666666 · <a href="mailto:mail@mail.com">mail@mail.com</a>
          </div>
        </div>
        <nav id="footer-menu">
          <Menuoptions />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
