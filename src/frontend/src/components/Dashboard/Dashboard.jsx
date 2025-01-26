import React, { useEffect, useState } from "react";
import {
  FaUserMd,
  FaClock,
  FaSignal,
  FaHeartbeat,
  FaProcedures,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./Dashboard.css";

const NotificationPopup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Notification</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [patientId, setPatientId] = useState(localStorage.getItem("patientId"));
  const [generalStats, setGeneralStats] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notified, setNotified] = useState(false);

  // Function to fetch data
  const fetchData = async () => {
    try {
      if (!patientId) {
        throw new Error("Patient ID is missing. Please log in again.");
      }

      // Fetch general statistics
      const statsResponse = await fetch(
        "https://ifem-award-mchacks-2025.onrender.com/api/v1/stats/current"
      );
      if (!statsResponse.ok) {
        throw new Error("Failed to fetch general statistics.");
      }
      const statsData = await statsResponse.json();
      setGeneralStats(statsData);

      // Fetch patient-specific data
      const patientResponse = await fetch(
        `https://ifem-award-mchacks-2025.onrender.com/api/v1/patient/${patientId}`
      );
      if (!patientResponse.ok) {
        throw new Error("Failed to fetch patient data.");
      }
      const patientData = await patientResponse.json();
      setPatientData(patientData);

      // Trigger notification based on current phase
      if (patientData.status?.current_phase === "Doctor Consultation" && !notified) {
        setShowNotification(true);
        setNotified(true); // Ensure notification is only triggered once
      }
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError(err.message);
    }
  };

  // useEffect with interval
  useEffect(() => {
    fetchData(); // Fetch data on mount
    const intervalId = setInterval(fetchData, 60000); // Fetch data every minute
    return () => clearInterval(intervalId); // Clean up the interval
  }, [patientId, notified]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!generalStats || !patientData) {
    return <p className="loading-message">Loading data...</p>;
  }

  const { averageWaitTimes, categoryBreakdown } = generalStats;
  const { status, triage_category, queue_position, time_elapsed } = patientData;

  const formatTime = (minutes) => ({
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  });

  const avgWaitTime = averageWaitTimes[triage_category] || 0;
  const avgWaitTimeFormatted = formatTime(avgWaitTime);
  const timeElapsedFormatted = formatTime(time_elapsed);

  const triageCategoryInfo = {
    1: {
      color: "#A3D5FF",
      name: "RESUSCITATION (Blue)",
      icon: <FaHeartbeat />,
      message: "You are in the best hands for immediate care.",
    },
    2: {
      color: "#FFB3B3",
      name: "EMERGENT (Red)",
      icon: <FaProcedures />,
      message: "You are receiving rapid attention to your needs.",
    },
    3: {
      color: "#FFE699",
      name: "URGENT (Yellow)",
      icon: <FaUserMd />,
      message: "You are being cared for as quickly as possible.",
    },
    4: {
      color: "#A8E6CF",
      name: "LESS URGENT (Green)",
      icon: <FaClock />,
      message: "Your condition is less urgent but still important.",
    },
    5: {
      color: "#E6E6E6",
      name: "NON URGENT (White)",
      icon: <FaSignal />,
      message: "You will be attended to as soon as possible.",
    },
  };

  const triageInfo = triageCategoryInfo[triage_category];

  // Triage category breakdown for the chart
  const triageCategoryData = Object.entries(categoryBreakdown).map(
    ([key, value]) => ({
      name: `Category ${key}`,
      total: value,
      color: ["#A3D5FF", "#FFB3B3", "#FFE699", "#A8E6CF", "#E6E6E6"][key - 1],
    })
  );

  return (
    <div className="dashboard">
      {showNotification && (
        <NotificationPopup
          message="It's your turn to see the doctor! Please proceed to the assigned room."
          onClose={() => setShowNotification(false)}
        />
      )}
      <h1 className="dashboard-title">Emergency Room Dashboard</h1>
      <div className="grid-container">
        <Card
          icon={<FaUserMd />}
          title="Average Wait Time"
          value={`${avgWaitTimeFormatted.hours} hr ${avgWaitTimeFormatted.minutes} min`}
        />
        <Card
          icon={<FaClock />}
          title="Time Elapsed"
          value={`${timeElapsedFormatted.hours} hr ${timeElapsedFormatted.minutes} min`}
        />
        <Card
          icon={<FaSignal />}
          title="Your Current Phase"
          value={status.current_phase}
        />
        <Card
          icon={<FaSignal />}
          title="Queue Position"
          value={queue_position?.global || "N/A"}
        />
        <TriageCard
          icon={triageInfo.icon}
          title="Your Triage Category"
          value={triageInfo.name}
          color={triageInfo.color}
          message={triageInfo.message}
        />
        <div className="card large-card">
          <h3 className="card-title">Triage Categories</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={triageCategoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" barSize={50}>
                  {triageCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, title, value }) => (
  <div className="card">
    <div className="card-icon">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-value">{value}</p>
  </div>
);

const TriageCard = ({ icon, title, value, color, message }) => (
  <div className="card triage-card">
    <div className="triage-icon">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-value" style={{ color }}>
      {value}
    </p>
    <p className="card-message">{message}</p>
  </div>
);

export default Dashboard;
