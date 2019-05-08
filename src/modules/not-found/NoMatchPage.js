import React from 'react';
import PropTypes from 'prop-types';
// Components
import Footer from '../common/footer/Footer';

const NoMatchPage = () => (
  <div className="container-fluid" id="not-found">
    <div className="container main-container pt100 text-center">
      <h2>404</h2>
      <p>This is an error.</p>
      <p>The requested URL /hosting was not found on this server.</p>
      <p>This is all we know.</p>
    </div>
    <Footer />
  </div>
);

NoMatchPage.propTypes = {
  location: PropTypes.object, // react router
  classes: PropTypes.object, // Material UI Injecte
};

export default NoMatchPage;
