import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn/LogIn";
import Dashboard from "./components/Dashboard/dashboard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
