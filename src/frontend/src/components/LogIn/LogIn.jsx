import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

const LogIn = () => {
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePatientIdChange = (e) => setPatientId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Step 1: Fetch the queue
      const queueResponse = await fetch(
        "https://ifem-award-mchacks-2025.onrender.com/api/v1/queue"
      );
      if (!queueResponse.ok) throw new Error("Failed to fetch the queue");
      const queueData = await queueResponse.json();

      // Step 2: Check if the patient ID is in the queue
      const patientInQueue = queueData.patients.find(
        (patient) => patient.id === patientId
      );
      if (!patientInQueue) {
        throw new Error("Patient ID not found in the queue.");
      }

      // Step 3: Save the patient ID in local storage
      localStorage.setItem("patientId", patientId);
      console.log("Patient ID saved to local storage:", patientId);

      // Step 4: Navigate to the dashboard or landing page
      navigate("/EmergencyLandingPage");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <img src="./src/assets/img.gif" alt="CareAccess Logo" />
      </div>
      <div className="right-side">
        <div className="login-container">
          <h2 className="heading">Login with Patient ID</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Patient ID"
              className="input"
              value={patientId}
              onChange={handlePatientIdChange}
              required
            />
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
