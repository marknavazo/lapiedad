import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReCaptcha } from 'react-recaptcha-google';
import { GridLoader } from 'react-spinners';
import CONTACT from '../../../texts/contact';
import GENERALTEXT from '../../../texts/generaltext';

// Components
import Footer from '../../common/footer/Footer';

const $ = window.$;
let errorMail;
let errorPhone;

const override = {
  display: 'block',
  margin: '50px auto',
};

/* eslint-disable */
const reEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */
const rePhone = /^[+]?\d{2,}?[(]?\d{2,}[)]?[-\s.]?\d{2,}?[-\s.]?\d{2,}[-\s.]?\d{0,9}$/im;

class ContactPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: {
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
      },
      submitted: false,
    };
    this.recaptchaToken = null;
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    document.title = `${GENERALTEXT.PAGE_TITLE} - ${GENERALTEXT.CONTACT}`;
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  verifyCallback(recaptchaToken) {
    this.recaptchaToken = recaptchaToken;
    // this.setState({ recaptchaToken });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { contact } = this.state;
    this.setState({
      contact: {
        ...contact,
        [name]: value,
      },
    });
  }

  validatePhone() {
    const { contact } = this.state;
    if (contact.phoneNumber) {
      if (!rePhone.test(String(contact.phoneNumber).toLowerCase())) {
        errorPhone = `${CONTACT.PHONE_ERROR}`;
        return false;
      }
    } else if (contact.phoneNumber === '') {
      errorPhone = `${CONTACT.PHONE_NUMBER} ${CONTACT.IS_REQUIRED}`;
      return false;
    }
    return true;
  }

  validateMail() {
    const { contact } = this.state;
    if (contact.email) {
      if (!reEmail.test(String(contact.email).toLowerCase())) {
        errorMail = `${CONTACT.EMAIL_ERROR}`;
        return false;
      }
    } else if (contact.email === '') {
      errorMail = `${CONTACT.EMAIL} ${CONTACT.IS_REQUIRED}`;
      return false;
    }
    return true;
  }

  resertForm() {
    this.setState({
      contact: {
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
      },
      contactEmail: 'success',
      contactMessage: 'Message sent!',
      submitted: false,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { contact } = this.state;
    if (contact.name && contact.email && contact.phoneNumber && contact.message) {
      $.ajax({
        url: 'https://web.be/mailer.php',
        type: 'POST',
        data: {
          form_name: contact.name,
          form_email: contact.email,
          form_number: contact.phoneNumber,
          form_msg: contact.message,
        },
        cache: false,
        success: function ok() {
          this.resertForm();
        }.bind(this),
        error: function ko() {
          this.setState({
            contactEmail: 'danger',
            contactMessage: 'Error',
          });
        }.bind(this),
      });
      return false;
    }
    return false;
  }

  render() {
    const { registering } = this.props;
    const { contact, submitted, error, contactEmail, contactMessage } = this.state;
    const { name, email, phoneNumber, message } = contact;
    const isInvalid = !name || !email || !phoneNumber || !message || this.recaptchaToken === null;

    return (
      <div className="container-fluid" id="contact">
        <div className="container main-container pt90">
          <h2>{CONTACT.TITLE}</h2>
          <div className="row mt50">
            <div className="col-md-6" id="form">
              <form className="form" name="form" onSubmit={this.handleSubmit}>
                <div
                  className={`inputs form-group${submitted && !contact.name ? ' has-error' : ''}`}
                >
                  <div>
                    <label htmlFor="name">{CONTACT.NAME}</label>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={contact.name}
                    onChange={this.handleChange}
                    placeholder={CONTACT.NAME}
                  />
                  {submitted && !contact.name && <i className="fas fa-exclamation-circle" />}
                  {submitted && !contact.name && (
                    <div className="mandatory">{`${CONTACT.NAME} ${CONTACT.IS_REQUIRED}`}</div>
                  )}
                </div>
                <div
                  className={`inputs form-group${submitted && !contact.email ? ' has-error' : ''}`}
                >
                  <div>
                    <label htmlFor="email">{CONTACT.EMAIL}</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id="email"
                    value={contact.email}
                    onChange={this.handleChange}
                    placeholder={CONTACT.EMAIL}
                  />
                  {submitted && !this.validateMail() && errorMail && (
                    <i className="fas fa-exclamation-circle" />
                  )}
                  {submitted && !this.validateMail() && errorMail && (
                    <div className="mandatory">{errorMail}</div>
                  )}
                </div>
                <div
                  className={`inputs form-group${
                    submitted && !contact.phoneNumber ? ' has-error' : ''
                  }`}
                >
                  <div>
                    <label htmlFor="phoneNumber">{CONTACT.PHONE_NUMBER}</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={contact.phoneNumber}
                    onChange={this.handleChange}
                    placeholder={CONTACT.PHONE_NUMBER}
                  />
                  {submitted && !this.validatePhone() && errorPhone && (
                    <i className="fas fa-exclamation-circle" />
                  )}
                  {submitted && !this.validatePhone() && errorPhone && (
                    <div className="mandatory">{errorPhone}</div>
                  )}
                </div>
                <div
                  className={`inputs form-group${
                    submitted && !contact.message ? ' has-error' : ''
                  }`}
                >
                  <div>
                    <label htmlFor="message">{CONTACT.MESSAGE}</label>
                  </div>
                  <textarea
                    type="text"
                    className="form-control"
                    name="message"
                    id="message"
                    value={contact.message}
                    onChange={this.handleChange}
                    placeholder={CONTACT.MESSAGE}
                  />
                  {submitted && !contact.message && <i className="fas fa-exclamation-circle" />}
                  {submitted && !contact.message && (
                    <div className="mandatory">{`${CONTACT.MESSAGE} ${CONTACT.IS_REQUIRED}`}</div>
                  )}
                </div>
                <div className="form-group text-center">
                  <div className="captcha">
                    <ReCaptcha
                      ref={el => {
                        this.captchaDemo = el;
                      }}
                      size="normal"
                      render="explicit"
                      sitekey="6LcibKIUAAAAALnzqUTEE5l-NTDNhtL_IOZX6C_i"
                      onloadCallback={this.onLoadRecaptcha}
                      verifyCallback={this.verifyCallback}
                    />
                  </div>
                </div>
                <div className="row">
                  <button type="submit" disabled={isInvalid} className="send__message__button">
                    {CONTACT.SEND}
                  </button>
                </div>
                <div className="row">
                  {registering && <GridLoader css={override} color="#ffffff" />}
                </div>
                {contactEmail === 'success' && contactMessage && (
                  <div className="row">
                    <div className="success">{contactMessage}</div>
                  </div>
                )}
                {contactEmail === 'danger' && error && (
                  <div className="row">
                    <div className="mandatory">{contactMessage}</div>
                  </div>
                )}
              </form>
            </div>
            <div className="col-md-6" id="contact-data">
              <h3>Datos</h3>
              <p>
                <i className="fas fa-phone" /> +34666666666
              </p>
              <p>
                <a href="mailto:mail@mail.com">
                  <i className="far fa-envelope" /> mail@mail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ContactPage.propTypes = {
  history: PropTypes.object, // React Router Injected
  registering: PropTypes.object,
};

export default ContactPage;
