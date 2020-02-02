import React from 'react';
import { withTranslation } from 'react-i18next';
import Form from '../Form';
import Input from '../Input';
import Navbar from '../Navbar';
import { FaUser, FaSearch } from 'react-icons/fa';
import './reset-password.css';
import { notification } from 'antd';
import api from '../../utils/api';

const { resetPassword, updatePassword } = api();


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

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      error: false,
      isLoading: true,
      showError: false,
      messageFromServer: ''
    }
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
    user.email = this.state.email;
    updatePassword(user)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    resetPassword(token)
      .then(res => {
        this.setState({
          isLoading:false,
          email: res.email
        })
      })
      .catch(error => {
        this.setState({
          error: true,
          isLoading: false
        })
      });
    } 

  render() {
    const { email, error, isLoading, showError } = this.state;
    
    if (error) {
      return (
        <div>
          <Navbar />
          <div className="reset-password">
            <div className="column">
              <h1 className="avatar has-text-centered section"><span aria-label="logo" role="img" style={{fontSize: '2rem'}}>Not valid link for reset Password</span></h1>
            </div>
          </div>
        </div>
      )
    }
    if (isLoading) {
      return null;
    }
    
    return (
      
      <div>
        <Navbar />
        <div className="reset-password">
        <div className="column">
          <h1 className="avatar has-text-centered section"><span aria-label="logo" role="img" style={{fontSize: '2rem'}}>Update Password for {this.state.email}</span></h1>
          <div className="login-form">
            <Form onSubmit={this.handleSubmit} initialValue={{password: '' }}>
              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left">
                  <Input name="password" className="input" type="password" placeholder="e.g. Smith" />
                  <span className="icon is-small is-left"><FaUser /></span>
                </div>
                <p className="help">The last name is invalid, is too short</p>
              </div>
              

              
            
              <div className="field">
                <p className="control">
                  <button className="button is-dark is-medium is-fullwidth is-disabled">Update Password</button>
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

export default ResetPassword;