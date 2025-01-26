import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

const LoginPage = () => {
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePatientIdChange = (e) => setPatientId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Fetch patient-specific data
      const patientResponse = await fetch(
        `https://ifem-award-mchacks-2025.onrender.com/api/v1/patient/${patientId}`
      );
      if (!patientResponse.ok) throw new Error("Invalid Patient ID");
      const patientData = await patientResponse.json();

      // Fetch general statistics
      const statsResponse = await fetch(
        "https://ifem-award-mchacks-2025.onrender.com/api/v1/stats/current"
      );
      if (!statsResponse.ok) throw new Error("Failed to fetch general stats");
      const generalStats = await statsResponse.json();

      // Navigate to the dashboard and pass the data
      navigate("/dashboard", { state: { generalStats, patientData } });
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
          <h2 className="heading">Login Page</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Patient ID"
              className="input"
              value={patientId}
              onChange={handlePatientIdChange}
              required
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
