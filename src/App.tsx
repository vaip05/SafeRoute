import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import SOS from './pages/SOS';
import Home from './pages/Home';
import Reports from './pages/Reports';
import ReportMainPage from './pages/ReportsMainPage';
import MapPage from './pages/Map';
import About from './pages/About';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const libraries: ("places")[] = ['places'];

const App: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/main" element={<ReportMainPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/sos" element={<SOS />} />
          <Route
            path="/about"
            element={
              <div style={{ padding: '2rem' }}>
                <h1>About Page Coming Soon</h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </LoadScript>
  );
};

export default App;
