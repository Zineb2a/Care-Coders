import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import LogIn from "./components/LogIn/LogIn";
import Buttons from "./components/Buttons/Buttons";
import Dashboard from "./components/Dashboard/dashboard";
import EmergencyLandingPage from "./components/Landing/EmergencyLandingPage";
import Games from './games/games.jsx';
import Tetris from './games/MiniTetris/Tetris.jsx';
import Mini from './games/minesweeper/Mini/Mini.jsx';
import Chatbot from "./components/Chatbot/Chatbot";
import Sidebar from "../src/components/SideBar/SideBar.jsx";
import FeedbackForm from "./components/Feedback/Feedback.jsx";
 

// Layout Component for Pages with Sidebar
const Layout = ({ children }) => (
  <div className="layout-container">
    <Sidebar />
    <div className="main-content">{children}</div>
  </div>
);

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LogIn />} />
          {/* Protected Routes with Sidebar */}
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
            path="/games"
            element={
              <Layout>
                <Mini />
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
          <Route path="/game" element={<Games />} />
          <Route path="/tetris" element={<Tetris />} />
          <Route path="/minesweeper" element={<Mini />} />
          <Route path="/feedback" element={<FeedbackForm />} />

        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
