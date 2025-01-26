import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import LogIn from "./components/LogIn/LogIn";
import Dashboard from "./components/Dashboard/dashboard";
import EmergencyLandingPage from "./components/Landing/EmergencyLandingPage";
import Mini from "./games/minesweeper/Mini/Mini";
import Chatbot from "./components/Chatbot/Chatbot";
import Sidebar from "./components/SideBar/SideBar"; 
import Buttons from "./components/Buttons/Buttons"; 

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
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
