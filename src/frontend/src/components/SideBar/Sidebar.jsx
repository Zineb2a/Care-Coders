import React from "react";
import { Link } from "react-router-dom"; // Use Link from React Router
import "./Sidebar.css";
import ERlogo from "../../assets/ERlogotrans.png";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h2 className="menu-title">
        <img src={ERlogo} alt="ERlogo" className="logo" />
      </h2>
      <nav className="menu-links">
        <Link to="/dashboard" className="menu-link">
          <span className="material-icons menu-icon">dashboard</span>
          Dashboard
        </Link>
        <Link to="/calming-zone" className="menu-link">
          <span className="material-icons menu-icon">spa</span>
          Calming Zone
        </Link>
        <Link to="/games" className="menu-link">
          <span className="material-icons menu-icon">sports_esports</span>
          Games
        </Link>
        <Link to="/feedback" className="menu-link">
          <span className="material-icons menu-icon">feedback</span>
          Feedback
        </Link>
        <Link to="/chatbot" className="menu-link">
          <span className="material-icons menu-icon">chat</span>
          Chatbot Assistant
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
