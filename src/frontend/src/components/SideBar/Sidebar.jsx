import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {

  return (
    <div className="sidebar-container">
        <br/>
        <br/>
        <br/>
        <br/>
        <h2 className="menu-title"> Menu </h2>
        <nav className="menu-links">
          <a href="#" className="menu-link">
            <img src="./src/assets/business-report.png" alt="Dashboard Icon" style={{ width: '20px', marginRight: '10px', marginTop: '-18px'}}/> Dashboard
          </a>
          <a href="#" className="menu-link">
            <img src="./src/assets/harmony.png" alt="Calming Zone Icon" style={{ width: '20px', marginRight: '10px', marginTop: '10px' }} />
            Calming Zone
          </a>
          <a href="#" className="menu-link">
            <img src="./src/assets/puzzle.png" alt="Games Icon" style={{ width: '20px', marginRight: '10px', marginTop: '10px'  }} />
            Games
          </a>
          <a href="#" className="menu-link">
            <img src="./src/assets/feedback.png" alt="Feedback Icon" style={{ width: '20px', marginRight: '10px', marginTop: '10px'  }} />
            Feedback
          </a>
        </nav>
    </div>
  );
};

export default Sidebar;




