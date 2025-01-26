import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import SignUpPage from './components/SignUp/SignUp';
import EmergencyLandingPage from './components/Landing/EmergencyLandingPage.jsx';
import './App.css';

function App() {
  return (  
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/landing" element={<EmergencyLandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
