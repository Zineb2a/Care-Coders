import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path="/" element={<LogIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
