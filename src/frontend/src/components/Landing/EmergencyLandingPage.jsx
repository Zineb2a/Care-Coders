import React, { useState } from "react";
import "./EmergencyLandingPage.css";
import Sidebar from "../SideBar/Sidebar.jsx";
import ERlogo from "../../assets/ERlogotrans.png";
import hourglass from "../../assets/hourglass.gif";

const EmergencyLandingPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="app-container">
      <header className="header">
        <img src={ERlogo} alt="ERlogo" className="logo" />
      </header>
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
          {sidebarVisible && <Sidebar currentPage="Welcome" />}
        </div>
      </main>
    </div>
  );
};

export default EmergencyLandingPage;