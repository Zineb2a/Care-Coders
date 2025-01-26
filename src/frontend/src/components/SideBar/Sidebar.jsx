import React from 'react';
import './Sidebar.css';
import ERlogo from "../../assets/ERlogotrans.png";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h2 className="menu-title"> <img src={ERlogo} alt="ERlogo" className="logo" /></h2>
      <nav className="menu-links">
        <a href="#" className="menu-link">
          <span className="material-icons menu-icon">dashboard</span>
          Dashboard
        </a>
        <a href="#" className="menu-link">
          <span className="material-icons menu-icon">spa</span>
          Calming Zone
        </a>
        <a href="#" className="menu-link">
          <span className="material-icons menu-icon">sports_esports</span>
          Games
        </a>
        <a href="#" className="menu-link">
          <span className="material-icons menu-icon">feedback</span>
          Feedback
        </a>
        <a href="#" className="menu-link">
          <span className="material-icons menu-icon">chat</span>
          Chatbot Assistant
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
