import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import SignUpPage from './components/SignUp/SignUp';
import Chatbot from './components/Chatbot/Chatbot';
Chatbot

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path="/" element={<Chatbot />} />
         
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
