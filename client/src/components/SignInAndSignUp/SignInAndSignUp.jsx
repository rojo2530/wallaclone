import React from 'react';
import './SignInAndSignUp.css';

import Register from '../Register';
import Navbar from '../Navbar';
import Login from '../Login';

const SignInAndSignUp = () => (
  <div>
    <Navbar />
    <div className="sign-in-and-sign-up">
      <Register />
      <Login />
    </div>    
  </div>
);

export default SignInAndSignUp;