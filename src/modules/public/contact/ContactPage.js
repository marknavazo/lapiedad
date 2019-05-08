import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReCaptcha } from 'react-recaptcha-google';
import { GridLoader } from 'react-spinners';
import { GENERAL, CONTACT } from '../../../texts';

// Components
import Footer from '../../common/footer/Footer';

const $ = window.$;
let errorMail;
let errorPhone;

const override = `
  display: block;
  margin: 50px auto;
  border-color: red;
`;

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
    document.title = `${GENERAL.PAGE_TITLE} - ${GENERAL.CONTACT}`;
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
    this.setState({ recaptchaToken });
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
      const re = /^[+]?\d{2,}?[(]?\d{2,}[)]?[-\s.]?\d{2,}?[-\s.]?\d{2,}[-\s.]?\d{0,9}$/im;
      if (!re.test(String(contact.phoneNumber).toLowerCase())) {
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
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(contact.email).toLowerCase())) {
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
    });

    this.setState({ submitted: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { contact } = this.state;
    if (contact.name && contact.email && contact.phoneNumber && contact.message) {
      $.ajax({
        url: 'https://city-talent.phoenix-connection.be/mailer.php',
        type: 'POST',
        data: {
          form_name: contact.name,
          form_email: contact.email,
          form_number: contact.phoneNumber,
          form_msg: contact.message,
        },
        cache: false,
        success: function(data) {
          this.resertForm();
          this.setState({
            contactEmail: 'success',
            contactMessage: 'Message sent!',
          });
        }.bind(this),
        error: function(xhr, status, err) {
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
    const { contact, submitted } = this.state;

    const isInvalid =      !contact.name === '' ||
      contact.email === '' ||
      contact.phoneNumber === '' ||
      contact.message === '' ||
      this.recaptchaToken === null;

    return (
      <div className="container-fluid" id="contact">
        <div className="container main-container pt80">
          <h2>{CONTACT.TITLE}</h2>
          <div className="row mt50">
            <div className="col-md-8 offset-md-2">
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
                  <button disabled={isInvalid} className="send__message__button">
                    {CONTACT.SEND}
                  </button>
                  {registering && <GridLoader css={override} color="#ffffff" />}
                </div>
              </form>
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
};

export default ContactPage;
