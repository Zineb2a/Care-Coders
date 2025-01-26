import React, { useState, useEffect } from "react";
import "./EmergencyLandingPage.css";
import Sidebar from "../SideBar/SideBar";
import hourglass from "../../assets/hourglass.gif";

const EmergencyLandingPage = () => {
  const [patientId, setPatientId] = useState(localStorage.getItem("patientId"));
  const [queuePosition, setQueuePosition] = useState(null);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchPatientData = async () => {
    try {
      if (!patientId) {
        throw new Error("Patient ID is missing. Please log in again.");
      }

      const response = await fetch(
        `https://ifem-award-mchacks-2025.onrender.com/api/v1/patient/${patientId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch patient data.");
      }

      const data = await response.json();
      setQueuePosition(data.queue_position.global);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  return (
    <div className="app-container">
      <main className="content">
        <div className="welcome-container">
          <div className="illustration">
            <img src={hourglass} alt="hourglass" />
          </div>
          <h1 className="welcome-title">Welcome to CareAccess!</h1>
          <p className="subtitle">Your Guide Through the Waiting Room</p>
          {error ? (
            <p className="error-message">{error}</p>
          ) : queuePosition !== null ? (
            <p className="queue-position">
              Current Position: <span>{queuePosition}</span>
            </p>
          ) : (
            <p className="loading-message">Loading your position...</p>
          )}
          {/* <button
            onClick={() => setIsSidebarOpen(true)}
            className="event-info-button"
          >
            Explore Menu
          </button> */}
        </div>
      </main>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
};

export default EmergencyLandingPage;
