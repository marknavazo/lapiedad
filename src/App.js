import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadReCaptcha } from 'react-recaptcha-google';

// Routes
import Routes from './Routes';

class App extends Component {
  componentDidMount() {
    loadReCaptcha();
  }

  render() {
    return (
      <div>
        <Router>
          <Routes />
        </Router>
      </div>
    );
  }
}

export default App;
