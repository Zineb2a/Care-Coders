import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpPage from '../SignUp/SignUp';
import './LogIn.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Email:', email, 'Password:', password);
  };
  
  const handleLanding = () => {
    navigate('/landing');
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <img src="./src/assets/img.gif" alt="CareAccess Logo"/>
      </div>
      <div className="right-side">
        <div className="login-container">
          <h2 className="heading">Login Page</h2>
          
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
            <button type="submit" className="login-button" onClick={handleLanding}>Login</button>
          </form>
          
          <a href="/signup" className="forgot-password" onClick={goToSignUp}>
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
