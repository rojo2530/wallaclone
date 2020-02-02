import React from 'react';
// import SelectTagContext from '../SelectTagContext/';
import Form from '../Form';
import Input from '../Input';
import { FaUser, FaTag } from 'react-icons/fa';
import { notification } from 'antd';
import api from '../../utils/api';

const { registerUser } = api(); 

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

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  isInvalidValidForm(user) {
    return user.email.trim().length <= 3 ||
      user.nickname.trim().length <= 3 
  }

  handleSubmit(user) {
    if (this.isInvalidValidForm(user)) {
      openNotificationWarning('Invalid Form', `The Email or nickname are not correct`);
      return false;
    }
    console.log(user);
    // registerUser(user)
    //   .then(res => {
    //     openNotificationSucess('User created with sucess',`the user ${res.email} was created correctly`);
    //   })
    //   .catch(err => {
    //     console.log(err.response.data.error);
    //     openNotificationWarning('Invalid Nickname or Email', err.response.data.error);
    //   });
    //le ponemos los campos del token para recuperar la password
    this.props.newUser(user);
   
  }

  render() {
    return(
      
            <div className="column is-6 ">
              <h1 className="avatar has-text-centered section"><span aria-label="logo" role="img" style={{fontSize: '2rem'}}>I do not have an account</span></h1>
              <span>Sign up with your email and password</span>
              <div className="login-form">
                <Form onSubmit={this.handleSubmit} initialValue={{email: '', nickname: '', password: ''}}>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <Input name="email" className="input" type="email" placeholder="e.g Alex@hotmail.com" />
                      <span className="icon is-small is-left"><FaUser /></span>
                    </div>
                    <p className="help">The name is invalid, is too short</p>
                  </div>
                  
                  <div className="field">
                    <label className="label">Nickname</label>
                    <div className="control has-icons-left">
                      <Input name="nickname" className="input" type="text" placeholder="e.g. Smith" />
                      <span className="icon is-small is-left"><FaUser /></span>
                    </div>
                    <p className="help">The last name is invalid, is too short</p>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <Input name="password" className="input" type="password" placeholder="" />
                      <span className="icon is-small is-left"><FaUser /></span>
                    </div>
                    <p className="help">The last name is invalid, is too short</p>
                  </div>

                  
                
                  <div className="field">
                    <p className="control">
                      <button className="button is-dark is-medium is-fullwidth is-disabled">Create</button>
                    </p>
                  </div>
                </Form>
              </div>
              <hr />
              <div className="forgot-password">
                <p className="has-text-centered">Remember, the fields can not be empty</p>
              </div>
            </div>
       
    )
  }
}




