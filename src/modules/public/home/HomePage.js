import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GENERAL, HOME } from '../../../texts';

// Components
import Footer from '../../common/footer/Footer';

class HomePage extends Component {
  componentDidMount() {
    document.title = `${GENERAL.PAGE_TITLE} - ${GENERAL.HOME}`;
  }

  render() {
    return (
      <div className="container-fluid" id="home">
        <div className="container main-container pt80">
          <div className="text__container">
            <h2>{HOME.TITLE}</h2>
            <p>{HOME.TEXT}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object, // React Router Injected
};

export default HomePage;
