// Sidebar.jsx
import './Sidebar.css';
// Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <button
        onClick={toggleSidebar}
        className="menu-button"
      >
        {isOpen ? '✖' : '☰'}
      </button>

      <div className={`sidebar ${isOpen ? 'visible' : ''}`}>
        <h2 className="menu-title">Menu</h2>
        <nav className="menu-links">
          <a href="#" className="menu-link">Waiting Room Status</a>
          <a href="#" className="menu-link">Calming Zone</a>
          <a href="#" className="menu-link">Games</a>
          <a href="#" className="menu-link">Feedback</a>
        </nav>
      </div>

      <div className="content-area">
        <div className="content">
          <h1>Welcome</h1>
          <p>Select an option from the menu.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;