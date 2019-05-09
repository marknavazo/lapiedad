import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GENERALTEXT from '../../../texts/generaltext';
import LOCALIZATION from '../../../texts/localization';

// Components
import Footer from '../../common/footer/Footer';

const styleMap = {
  border: 0,
};

class LocalizationPage extends Component {
  componentDidMount() {
    document.title = `${GENERALTEXT.PAGE_TITLE} - ${GENERALTEXT.LOCALIZATION}`;
  }

  render() {
    return (
      <div className="container-fluid" id="localization">
        <div className="container main-container pt90">
          <h2>{LOCALIZATION.TITLE}</h2>
          <div id="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3034.696307158163!2d-3.36573078429245!3d40.481983159591685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd424914866aff01%3A0x395da828aa2f9b3b!2sAlcal%C3%A1+de+Henares!5e0!3m2!1ses!2ses!4v1557383241395!5m2!1ses!2ses"
              width="600"
              title="Map"
              height="450"
              frameBorder="0"
              style={styleMap}
              allowFullScreen
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

LocalizationPage.propTypes = {
  history: PropTypes.object, // React Router Injected
};

export default LocalizationPage;
