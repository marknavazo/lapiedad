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

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #607d8b;
`;

class ContactPage extends Component {
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
    document.title = "Casa Rural La Piedad - Contacto";
  }

  componentWillUnmount() {
    this.isTokenSource.cancel('API Cancel');
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
        <h2>Contact</h2>
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

ContactPage.propTypes = {
  history: PropTypes.object, // React Router Injected
};

export default ContactPage;
