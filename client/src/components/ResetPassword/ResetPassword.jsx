import React from 'react';
import { withTranslation } from 'react-i18next';
import Form from '../Form';
import Input from '../Input';
import Navbar from '../Navbar';
import { FaUser } from 'react-icons/fa';
import './reset-password.css';
import { notification } from 'antd';
import api from '../../utils/api';

const { resetPassword, updatePassword } = api();

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

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: false,
      isLoading: true,
      showError: false,
      messageFromServer: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isInvalidValidForm(user) {
    return user.password.trim().length <= 3;
  }

  handleSubmit(user) {
    if (this.isInvalidValidForm(user)) {
      openNotificationWarning('Invalid Form', `The Email is not correct`);
      return false;
    }
    const { token } = this.props.match.params;
    user.email = this.state.email;
    user.resetPasswordToken = token;
    updatePassword(user)
      .then(res => openNotificationSucess('Update password', 'Update password with success'))
      .catch(err => openNotificationWarning('Error!!!', err.response.data.message));
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    resetPassword(token)
      .then(res => {
        this.setState({
          isLoading: false,
          email: res.email,
        });
      })
      .catch(error => {
        this.setState({
          error: true,
          isLoading: false,
        });
      });
  }

  render() {
    const { error, isLoading } = this.state;
    const { t } = this.props;

    if (error) {
      return (
        <div>
          <Navbar />
          <div className="reset-password">
            <div className="column">
              <h1 className="avatar has-text-centered section">
                <span aria-label="logo" role="img" style={{ fontSize: '2rem' }}>
                  {t('Not valid link for reset Password')}
                </span>
              </h1>
            </div>
          </div>
        </div>
      );
    }
    if (isLoading) {
      return null;
    }

    return (
      <div>
        <Navbar />
        <div className="reset-password">
          <div className="column">
            <h1 className="avatar has-text-centered section">
              <span aria-label="logo" role="img" style={{ fontSize: '2rem' }}>
                {t("Update Password for")} {this.state.email}
              </span>
            </h1>
            <div className="login-form">
              <Form
                onSubmit={this.handleSubmit}
                initialValue={{ password: '' }}
              >
                <div className="field">
                  <label className="label">{t("Password")}</label>
                  <div className="control has-icons-left">
                    <Input
                      name="password"
                      className="input"
                      type="password"
                      placeholder="e.g. Smith"
                    />
                    <span className="icon is-small is-left">
                      <FaUser />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <p className="control">
                    <button className="button is-dark is-medium is-fullwidth is-disabled">
                      {t("Update Password")}
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

export default withTranslation()(ResetPassword);
