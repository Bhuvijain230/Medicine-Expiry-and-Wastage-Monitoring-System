import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import Inventory from './Components/Inventory';
import Alerts from './Components/Alerts';
import Donations from './Components/Donations';
import Reports from './Components/Reports';
import Chatbot from './Components/Chatbot';

function App() {
  return (
    <div className="app">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
