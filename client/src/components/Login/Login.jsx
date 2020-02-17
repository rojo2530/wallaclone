import React from 'react';
import Form from '../Form';
import Input from '../Input';
import { FaUser, FaTag } from 'react-icons/fa';
import { notification } from 'antd';
import api from '../../utils/api';
import { withRouter, Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

const { login, checkToken } = api();

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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isInvalidValidForm(user) {
    return user.nickname.trim().length <= 3 
      || user.password.trim().length <= 3;
  }

  handleSubmit(user) {
    if (this.isInvalidValidForm(user)) {
      openNotificationWarning(
        'Invalid Form',
        `The Email or nickname are not correct`,
      );
      return false;
    }
    login(user)
      .then(res => {
        openNotificationSucess('Great!', 'Login is success');
        this.props.setUser(user);
        this.props.history.push('/');
      })
      .catch(error => {
        openNotificationWarning(
          'Invalid credentials',
          error.response.data.error,
        );
      });
  }

  render() {
    const { t } = this.props;
    return (
      <div className="column is-6">
        <h1 className="avatar has-text-centered section">
          <span aria-label="logo" role="img" style={{ fontSize: '2rem' }}>
            {t("I already have an account")}
          </span>
        </h1>
        <span>{t("Sign in with your nickname and password")}</span>
        <div className="login-form">
          <Form
            onSubmit={this.handleSubmit}
            initialValue={{ nickname: '', password: '' }}
          >
            <div className="field">
              <label className="label">{t("Nickname")}</label>
              <div className="control has-icons-left">
                <Input
                  name="nickname"
                  className="input"
                  type="text"
                  placeholder="e.g. Smith"
                />
                <span className="icon is-small is-left">
                  <FaUser />
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">{t("Password")}</label>
              <div className="control has-icons-left">
                <Input
                  name="password"
                  className="input"
                  type="password"
                  placeholder=""
                />
                <span className="icon is-small is-left">
                  <FaUser />
                </span>
              </div>
            </div>

            <div className="field">
              <p className="control">
                <button className="button is-dark is-medium is-fullwidth is-disabled">
                  {t("SignIn")}
                </button>
              </p>
            </div>
          </Form>
        </div>
        <hr />
        <div className="forgot-password">
          <p className="has-text-centered">
            <Link to="/forgot-password">{t("Forgot Password?")}</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withTranslation()(withRouter(Login));
