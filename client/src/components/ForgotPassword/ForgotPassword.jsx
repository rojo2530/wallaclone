import React from 'react';
import { withTranslation } from 'react-i18next';
import Form from '../Form';
import Input from '../Input';
import Navbar from '../Navbar';
import { FaUser } from 'react-icons/fa';
import './forgot-password.css';
import { notification } from 'antd';
import api from '../../utils/api';

const { forgotPassword } = api();

const openNotificationWarning = (message, description) => {
  notification.open({
    message,
    description,
    type: 'warning',
    style: { backgroundColor: 'yellow' },
  });
};

const openNotificationSucess = (message, description) => {
  notification.open({
    message,
    description,
    type: 'success',
    style: { backgroundColor: 'green' },
  });
};

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      isLoading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isInvalidValidForm(user) {
    return user.email.trim().length <= 3;
  }

  handleSubmit(user) {
    if (this.isInvalidValidForm(user)) {
      openNotificationWarning('Invalid Form', `The Email is not correct`);
      return false;
    }
    this.setState({
      isLoading: true
    })
    forgotPassword(user)
      .then(res => {
        this.setState({
          isLoading: false
        })
        openNotificationSucess('Email send', 'Sent email');
      })
      .catch(error => {
        this.setState({
          isLoading: false
        })
        openNotificationWarning('Error!!!', error.response.data.message);
      });
  }

  render() {
    const { t } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        <Navbar />
        <div className="forgot-password">
          <div className="column">
            <h1 className="avatar has-text-centered section">
              <span aria-label="logo" role="img" style={{ fontSize: '2rem' }}>
                {t("Reset Password")}
              </span>
            </h1>
            <span>
              {t("To reset your password, please provide your Email")}
            </span>
            <div className="login-form">
              <Form onSubmit={this.handleSubmit} initialValue={{ email: '' }}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <Input
                      name="email"
                      className="input"
                      type="email"
                      placeholder="e.g. Smith"
                    />
                    <span className="icon is-small is-left">
                      <FaUser />
                    </span>
                  </div>
                  <p className="help">The last name is invalid, is too short</p>
                </div>

                <div className="field">
                  <p className="control">
                    <button className={`button is-dark is-medium is-fullwidth is-disabled ${isLoading ? 'is-loading' : ''}`}>
                      {t("Send Reset Instructions")}
                    </button>
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ForgotPassword);
