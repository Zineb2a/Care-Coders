import React, { useState } from 'react';
import './SignUp.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Email:', email, 'Password:', password);
  };
  const goToLogIn = () => {
    navigate('/login');
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <img src="./src/assets/love.gif" alt="CareAccess Logo"/>
      </div>
      <div className="right-side">
        <div className="login-container">
          <h2 className="heading">SignUp Page</h2>
          
          <form onSubmit={handleSubmit}> 
            <input 
              type="email" 
              placeholder="Email" 
              className="input" 
              value={email} 
              onChange={handleEmailChange} 
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="input" 
              value={password} 
              onChange={handlePasswordChange} 
              required
            />
            <button type="submit" className="login-button">Login</button>
          </form>
          
          <a href="/login" className="forgot-password" onClick={goToLogIn}>
            Already have an account? Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
