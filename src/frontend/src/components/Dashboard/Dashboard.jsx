import React from "react";
import { FaUserMd, FaClock, FaSignal } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import "./Dashboard.css";

const Dashboard = ({ generalStats, patientData }) => {
  if (!generalStats || !patientData) {
    return <p className="loading-message">Loading data...</p>; // Display this if the required data is not passed
  }

  // Extract data from props
  const { averageWaitTimes, categoryBreakdown } = generalStats;
  const { time_elapsed, status, triage_category, queue_position } = patientData;

  // Determine the patient's average wait time
  const avgWaitTime = averageWaitTimes[triage_category];

  // Determine status color based on average wait time
  const statusColor = avgWaitTime > 120
    ? "#dc3545" // Red for Critical
    : avgWaitTime > 60
    ? "#ffc107" // Yellow for Moderate
    : "#28a745"; // Green for Stable

  // Prepare data for the bar chart
  const triageCategoryData = Object.entries(categoryBreakdown).map(([key, value]) => ({
    name: `Category ${key}`,
    total: value,
    color: ["#A3D5FF", "#FFB3B3", "#FFE699", "#A8E6CF", "#E6E6E6"][key - 1], // Assign colors dynamically
  }));

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Emergency Room Dashboard</h1>
      <div className="grid-container">
        {/* Average Wait Time for Patient's Triage */}
        <div className="card">
          <FaUserMd className="card-icon" />
          <h3 className="card-title">Your Average Wait Time</h3>
          <p className="card-value">{avgWaitTime} Min</p>
        </div>

        {/* Patient's Time Elapsed */}
        <div className="card">
          <FaClock className="card-icon" />
          <h3 className="card-title">Time Elapsed</h3>
          <p className="card-value">{time_elapsed} Min</p>
        </div>

        {/* Patient's Current Phase */}
        <div className="card">
          <FaSignal className="card-icon" />
          <h3 className="card-title">Your Current Phase</h3>
          <p className="card-status" style={{ color: statusColor }}>
            {status.current_phase}
          </p>
        </div>

        {/* Patient's Queue Position */}
        <div className="card">
          <FaSignal className="card-icon" />
          <h3 className="card-title">Queue Position</h3>
          <p className="card-value">
            Global: {queue_position.global}, Category: {queue_position.category}
          </p>
        </div>

        {/* Triage Categories Bar Chart */}
        <div className="card large-card">
          <h3 className="card-title">Triage Category Overview</h3>
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

export default Dashboard;
