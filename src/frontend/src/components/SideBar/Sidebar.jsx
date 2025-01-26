import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import ERlogo from "../../assets/ERlogotrans.png";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside of it
  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Burger Menu Button */}
      {!isSidebarOpen && (
        <button
          className="burger-menu"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span className="material-icons">menu</span>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar-container ${isSidebarOpen ? "open" : "closed"}`}
        ref={sidebarRef}
      >
        {/* Close Button */}
        <button
  className="sidebar-close-button"
  onClick={() => setIsSidebarOpen(false)}
>
  <span className="material-icons">close</span>
</button>

        <Link to="/EmergencyLandingPage">
        <h2 className="menu-title">
          <img src={ERlogo} alt="ERlogo" className="logo" />
        </h2>
        </Link>
        <nav className="menu-links">
          <Link to="/dashboard" className="menu-link">
            <span className="material-icons menu-icon">dashboard</span>
            Dashboard
          </Link>
          <Link to="/buttons" className="menu-link">
            <span className="material-icons menu-icon">spa</span>
            Calming Zone
          </Link>
          <Link to="/breathing-exercise" className="menu-link">
            <span className="material-icons menu-icon">self_improvement</span>
            Breathing Exercise
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
            Chatbot Assistance
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
