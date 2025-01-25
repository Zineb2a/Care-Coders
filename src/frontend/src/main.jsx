import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EmergencyLandingPage from './assets/EmergencyLandingPage.jsx'
import Sidebar from './assets/Sidebar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Sidebar />
    {/* < EmergencyLandingPage /> */}
    
  </StrictMode>,
)
