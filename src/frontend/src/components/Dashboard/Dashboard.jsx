import React from "react";
import { FaUserMd, FaClock, FaSignal } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const mockData = {
    avg_wait_time: { average: 54, time_elapsed: { hours: 0, minutes: 48 } },
    currentStatus: "Critical",
    triage_category: [
      { name: "Blue", description: "Requires Resuscitation", total: 25, color: "#A3D5FF" }, // Pastel Blue
      { name: "Green", description: "Less-Urgent Care", total: 40, color: "#A8E6CF" }, // Pastel Green
      { name: "Yellow", description: "Urgent Care", total: 15, color: "#FFE699" }, // Pastel Yellow
      { name: "Red", description: "Emergent Care", total: 5, color: "#FFB3B3" }, // Pastel Red
      { name: "White", description: "Not-urgent", total: 10, color: "#E6E6E6" }, // Light Gray (unchanged)
    ],
  };

  const statusColorMap = {
    Critical: "#dc3545", // Red for Critical
    Stable: "#28a745", // Green for Stable
    Moderate: "#ffc107", // Yellow for Moderate
  };

  const statusColor = statusColorMap[mockData.currentStatus] || "#6c757d"; // Default gray

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Emergency Room Dashboard</h1>
      <div className="grid-container">
        {/* Average ER Waiting Time */}
        <div className="card">
          <FaUserMd className="card-icon" />
          <h3 className="card-title">Average ER Waiting Time</h3>
          <p className="card-value">{mockData.avg_wait_time.average} Min</p>
        </div>

        {/* Current ER Waiting Time */}
        <div className="card">
          <FaClock className="card-icon" />
          <h3 className="card-title">Waiting Time Elapsed</h3>
          <p className="card-value">
            {mockData.avg_wait_time.time_elapsed.hours}:{mockData.avg_wait_time.time_elapsed.minutes}{" "}
            <span className="card-unit">hr:min</span>
          </p>
        </div>

        {/* Current Status */}
        <div className="card">
          <FaSignal className="card-icon" />
          <h3 className="card-title">Triage Status</h3>
          <p className="card-status" style={{ color: statusColor }}>
            {mockData.currentStatus}
          </p>
        </div>

        {/* Triage Categories Bar Chart */}
        <div className="card large-card">
          <h3 className="card-title">Triage Category Overview</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.triage_category}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" barSize={50}>
                  {mockData.triage_category.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} /> // Dynamically assign color
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
