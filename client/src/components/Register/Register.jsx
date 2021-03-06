import React from 'react';
import Form from '../Form';
import Input from '../Input';
import { FaUser } from 'react-icons/fa';
import { notification } from 'antd';
import { withTranslation } from 'react-i18next';

const openNotificationWarning = (message, description) => {
  notification.open({
    message,
    description,
    type: 'warning',
    style: { backgroundColor: 'yellow' },
  });
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isInvalidValidForm(user) {
    return user.email.trim().length <= 3 || user.nickname.trim().length <= 3;
  }

  handleSubmit(user) {
    if (this.isInvalidValidForm(user)) {
      openNotificationWarning(
        'Invalid Form',
        `The Email or nickname are not correct`,
      );
      return false;
    }

    this.props.newUser(user);
  }

  render() {
    const { t } = this.props;
    return (
      <div className="column is-6 ">
        <h1 className="avatar has-text-centered section">
          <span aria-label="logo" role="img" style={{ fontSize: '2rem' }}>
            {t('I do not have an account')}
          </span>
        </h1>
        <span>{t('Sign up with your email, username and password')}</span>
        <div className="login-form">
          <Form
            onSubmit={this.handleSubmit}
            initialValue={{ email: '', nickname: '', password: '' }}
          >
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <Input
                  name="email"
                  className="input"
                  type="email"
                  placeholder="e.g Alex@hotmail.com"
                />
                <span className="icon is-small is-left">
                  <FaUser />
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">{t('Nickname')}</label>
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
              <label className="label">{t('Password')}</label>
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
                  {t('Create')}
                </button>
              </p>
            </div>
          </Form>
        </div>
        <hr />
        <div className="forgot-password">
          <p className="has-text-centered">
            {t('Remember, the fields can not be empty')}
          </p>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Register);
