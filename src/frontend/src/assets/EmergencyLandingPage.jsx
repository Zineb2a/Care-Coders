import React, { useState } from "react";
import "./EmergencyLandingPage.css";
import ERlogo from "./ERlogotrans.png";
import hourglass from "./hourglass.gif";

const EmergencyLandingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <header className="header">
        <button onClick={toggleSidebar} className="menu-button">
          ☰
        </button>
        <img src={ERlogo} alt="ERlogo" className="logo" />
      </header>

      {isSidebarOpen && <Sidebar onClose={toggleSidebar} />} {/* Sidebar appears conditionally */}

      <main className="content">
        <div className="welcome-container">
          <div className="illustration">
            <img src={hourglass} alt="hourglass" />
          </div>
          <h1 style={{ color: "#336699", fontSize: "2rem", fontWeight: "bold" }}>
  Welcome to CareAccess!
</h1>

<p style={{ color: "#888888", fontSize: "1rem", textAlign: "center" }}>
  Your Guide Through the Waiting Room
</p>
<p style={{ color: "#888888", fontSize: "1rem", textAlign: "center" }}>
  Current Position: 3
</p>
          <button onClick={toggleSidebar} className="event-info-button">
            Explore Menu
          </button>
        </div>
      </main>
    </div>
  );
};

const Sidebar = ({ onClose }) => {
  return (
    <aside className="sidebar visible">
      <button onClick={onClose} className="close-button">
        ✖
      </button>
      <nav className="menu">
        <a href="#" className="menu-item">
          Waiting Room Status
        </a>
        <a href="#" className="menu-item">
          Calming Zone
        </a>
        <a href="#" className="menu-item">
          Games
        </a>
        <a href="#" className="menu-item">
          Feedback
        </a>
      </nav>
    </aside>
  );
};

export default EmergencyLandingPage;
