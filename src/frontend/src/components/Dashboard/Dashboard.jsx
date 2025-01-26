import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

const Dashboard = () => {
  const location = useLocation();
  const { generalStats, patientData } = location.state || {};

  // Handle missing data
  if (!generalStats || !patientData) {
    return <p className="loading-message">Loading data...</p>;
  }

  // Initial time elapsed
  const [timeElapsed, setTimeElapsed] = useState(
    patientData?.time_elapsed || 0
  );

  // Triage category details
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

  // Extract data
  const { averageWaitTimes, categoryBreakdown } = generalStats;
  const { status, triage_category, queue_position } = patientData;
  const avgWaitTime = averageWaitTimes[triage_category];

  // Format time in hours and minutes
  const formatTime = (minutes) => ({
    hours: Math.floor(minutes / 60),
    minutes: minutes % 60,
  });

  const avgWaitTimeFormatted = formatTime(avgWaitTime);
  const timeElapsedFormatted = formatTime(timeElapsed);

  // Update elapsed time every minute
  useEffect(() => {
    if (status.current_phase !== "discharged") {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 60000);

      return () => clearInterval(timer);
    }
  }, [status.current_phase]);

  // Define status color based on wait time
  const statusColor =
    avgWaitTime > 120 ? "#dc3545" : avgWaitTime > 60 ? "#ffc107" : "#28a745";

  // Triage category breakdown for the chart
  const triageCategoryData = Object.entries(categoryBreakdown).map(
    ([key, value]) => ({
      name: `Category ${key}`,
      total: value,
      color: ["#A3D5FF", "#FFB3B3", "#FFE699", "#A8E6CF", "#E6E6E6"][key - 1],
    })
  );

  const triageInfo = triageCategoryInfo[triage_category];

  return (
    <div className="dashboard">
      {/* Dashboard Title */}
      <h1 className="dashboard-title">Emergency Room Dashboard</h1>

      {/* Main Content Grid */}
      <div className="grid-container">
        {/* Card: Average Wait Time */}
        <Card
          icon={<FaUserMd />}
          title="Average Wait Time"
          value={`${avgWaitTimeFormatted.hours} hr ${avgWaitTimeFormatted.minutes} min`}
        />

        {/* Card: Time Elapsed */}
        <Card
          icon={<FaClock />}
          title="Time Elapsed"
          value={`${timeElapsedFormatted.hours} hr ${timeElapsedFormatted.minutes} min`}
        />

        {/* Card: Current Phase */}
        <Card
          icon={<FaSignal />}
          title="Your Current Phase"
          value={status.current_phase}
          valueStyle={{ color: statusColor }}
        />

        {/* Card: Queue Position */}
        <Card
          icon={<FaSignal />}
          title="Queue Position"
          value={queue_position?.global || "N/A"}
        />

        {/* Card: Triage Category */}
        <TriageCard
          icon={triageInfo?.icon}
          title="Your Triage Category"
          value={triageInfo?.name || "Unknown"}
          color={triageInfo?.color}
          message={triageInfo?.message}
        />

        {/* Large Card: Triage Categories Bar Chart */}
        <div className="card large-card">
          <h3 className="card-title"></h3>
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

// Reusable Card Component
const Card = ({ icon, title, value, valueStyle }) => (
  <div className="card">
    <div className="card-icon">{icon}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-value" style={valueStyle}>
      {value}
    </p>
  </div>
);

// Specialized Triage Card Component
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
