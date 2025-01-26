import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import LogIn from "./components/LogIn/LogIn";
import Buttons from "./components/Buttons/Buttons";
import Dashboard from "./components/Dashboard/dashboard";
import EmergencyLandingPage from "./components/Landing/EmergencyLandingPage";
import Games from "./games/games.jsx";
import Tetris from "./games/MiniTetris/Tetris.jsx";
import Mini from "./games/minesweeper/Mini/Mini.jsx";
import Chatbot from "./components/Chatbot/Chatbot";
import Sidebar from "./components/SideBar/SideBar.jsx";
import FeedbackForm from "./components/Feedback/Feedback.jsx";
import BreathingExercisePage from "./components/BreathingExercise/BreathingExercisePage";

// Layout Component for Pages with Sidebar
const Layout = ({ children }) => (
  <div className="layout-container" style={{ display: "flex", minHeight: "100vh" }}>
    <Sidebar /> {/* Sidebar always present */}
    <div className="main-content" style={{ flex: 1 }}>{children}</div>
  </div>
);

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route: LogIn (No Sidebar) */}
          <Route path="/" element={<LogIn />} />

          {/* Routes with Sidebar */}
          <Route
            path="/EmergencyLandingPage"
            element={
              <Layout>
                <EmergencyLandingPage />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/buttons"
            element={
              <Layout>
                <Buttons />
              </Layout>
            }
          />
          <Route
            path="/Chatbot"
            element={
              <Layout>
                <Chatbot />
              </Layout>
            }
          />
          <Route
            path="/games"
            element={
              <Layout>
                <Games />
              </Layout>
            }
          />
            <Route
            path="/breathing-exercise"
            element={
              <Layout>
                <BreathingExercisePage />
              </Layout>
            }
          />
          <Route
            path="/tetris"
            element={
              <Layout>
                <Tetris />
              </Layout>
            }
          />
          <Route
            path="/minesweeper"
            element={
              <Layout>
                <Mini />
              </Layout>
            }
          />
          <Route
            path="/feedback"
            element={
              <Layout>
                <FeedbackForm />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
