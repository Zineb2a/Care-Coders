import React from 'react';
import './EmergencyLandingPage.css';
import ERlogotrans from './ERlogotrans.png'; // Import the logo

const EmergencyLandingPage = () => {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src={ERlogotrans} alt="CareAccess Logo" className="logo" />
            {/* <h1 className="header-title">CareAccess</h1> */}
          </div>
          <nav className="nav">
            <a href="#visiting" className="nav-link">Home</a>
            <a href="#areas" className="nav-link">Waiting Room Status</a>
            <a href="#professionals" className="nav-link">Calming Zone</a>
            <a href="#research" className="nav-link">Games</a>
            <a href="#about" className="nav-link">Login/SignUp</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="hero">
        <h2 className="hero-title">Emergency and Urgent Care Wait Times</h2>
        <p className="hero-text">How can we help you today?</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      {/* Content Section */}
      <main className="main-content">
        <div className="info-card">
          <h3 className="info-title">Emergency Services</h3>
          <p className="info-text">
            Check the latest emergency and urgent care wait times at William Osler Health System. 
            Our goal is to provide transparent and up-to-date information to help you plan your visit.
          </p>
          <button className="info-button">View Wait Times</button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            This website uses cookies to enhance usability and provide you with a more personal experience. 
            By using this website, you agree to our use of cookies as explained in our Privacy Policy.
          </p>
          <button className="footer-button">Agree</button>
        </div>
      </footer>
    </div>
  );
};

export default EmergencyLandingPage;
