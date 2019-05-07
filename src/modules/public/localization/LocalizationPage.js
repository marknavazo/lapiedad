import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';

//Components 
import Navigation from '../../common/navigation/Navigation';

// Material UI
import Snackbar from '@material-ui/core/Snackbar';

// API
import { APP_TOKEN } from '../../../api/Constants';

import loadGoogleMapsAPI from 'load-google-maps-api'; // Única dependencia extra

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #607d8b;
`;

// es muy importante añadirle height y width!!!
const MAP_STYLES = {
  height: '450px',
  width: '100%'
}

const OPTIONS = {
  center: {
    lat: 41.4054682,
    lng: 2.12373473
  },
  zoom: 16
}

const API_CONFIG = {
  key:'AIzaSyDE2XTOO3mc5CnZSdfeesVG0xVfs8L9DidM__0',
  language: 'es'
}


class LocalizationPage extends Component {
  isTokenSource = axios.CancelToken.source();

  state = {
    form: {
      username: '',
      password: '',
    },
    isLoading: false,
    isSnackbarOpen: false,
    snackbarMessage: '',
  };

  componentDidMount(){
    document.title = "Casa Rural La Piedad - Localización";
    // Promise para que al ser resulta puedas manipular
    // las opciones de Google Maps
    loadGoogleMapsAPI( API_CONFIG ).then( googleMaps => {
      new googleMaps.Map( this.refs.map, OPTIONS );
    }).catch( err => {
      console.warning( 'Something went wrong loading the map', err );
    });
  }

  componentWillUnmount() {
    this.isTokenSource.cancel('API Cancel');
    // limpiando despues el component ya no es usado
    // evita errores en la console
    const allScripts = document.getElementsByTagName( 'script' );
    // recopilar todos los scripts,
    // filtrar los que contengan la key en 'src'
    // eliminarlo
    [].filter.call(
      allScripts,
      ( scpt ) => scpt.src.indexOf( 'key=AIzaSyDE2XTOO3mc5CnZSdfeesVG0xVfs8L9DidM__0' ) >= 0
    )[ 0 ].remove();
    // resetear la variable de Google
    window.google = {};
  }

  onHandleChangeForm = event => {
    const { form } = this.state;
    form[event.target.name] = event.target.value;
    this.setState({ form });
  };

  onHandleSubmitForm = async event => {
    event.preventDefault();

    const { history } = this.props;
    const { form } = this.state;

    const isFormEmpty = Object.values(form).every(item => item === '');
    if (isFormEmpty) {
      return;
    }
    try {
      this.setState({ isLoading: true });
      // const result = await AuthenticationAPI.onLogin({
      //   cancelToken: this.isTokenSource.token,
      //   username: form.username,
      //   password: form.password,
      // });
      this.setState({ isLoading: false });
      APP_TOKEN.set({
        token: '',
        refreshToken: '',
      });
      history.push('/auth');
    } catch (error) {
      if (axios.isCancel(error)) {
        // console.log('Request canceled', error.message);
      } else {
        const { message, errorCode } = error.response.data;
        if (errorCode === '401') {
          this.onToggleSnackbar({ message });
        }
        this.setState({ isLoading: false });
      }
    }
  };

  onToggleSnackbar = ({ message = 'Error' }) => {
    this.setState(state => ({
      isSnackbarOpen: !state.isSnackbarOpen,
      snackbarMessage: message,
    }));
  };

  render() {
    const { form, isLoading, isSnackbarOpen, snackbarMessage } = this.state;
    return (
      <Container>
        <Navigation />
        <h2>Localization</h2>
        <div id="map">
          <div ref="map" style={MAP_STYLES}></div>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={this.onToggleSnackbar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackbarMessage}</span>}
        />
      </Container>
    );
  }
}

LocalizationPage.propTypes = {
  history: PropTypes.object, // React Router Injected
};

export default LocalizationPage;
