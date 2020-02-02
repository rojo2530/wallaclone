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
    style: { backgroundColor: 'yellow' }
  });
}

const openNotificationSucess = (message, description) => {
  notification.open({
    message,
    description,
    type: 'success',
    style: { backgroundColor: 'green' }
  });
}

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      showError: false,
      messageFromServer: ''
    }
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
    forgotPassword(user)
      .then(res => {
        openNotificationSucess('Email send', 'Sent email');
        
      })
      .catch(error => {
        openNotificationWarning('Error!!!',error.response.data.message);
      })

  }

  render() {
    const { email, messageFromServer, showError } = this.state;
    return (
      
      <div>
        <Navbar />
        <div className="forgot-password">
        <div className="column">
          <h1 className="avatar has-text-centered section"><span aria-label="logo" role="img" style={{fontSize: '2rem'}}>Reset Password</span></h1>
          <span>To reset your password, please provide your WallaClone username.</span>
          <div className="login-form">
            <Form onSubmit={this.handleSubmit} initialValue={{email: ''}}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <Input name="email" className="input" type="email" placeholder="e.g. Smith" />
                  <span className="icon is-small is-left"><FaUser /></span>
                </div>
                <p className="help">The last name is invalid, is too short</p>
              </div>

              
            
              <div className="field">
                <p className="control">
                  <button className="button is-dark is-medium is-fullwidth is-disabled">Send Reset Instructions</button>
                </p>
              </div>
            </Form>
          </div>
        </div> 
        </div>   
  </div>
    )
  }


}

export default ForgotPassword;