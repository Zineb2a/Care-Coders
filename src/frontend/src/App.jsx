import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmergencyLandingPage from './assets/EmergencyLandingPage.jsx'
import Sidebar from './components/SideBar/SideBar.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path="/" element={<EmergencyLandingPage />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;