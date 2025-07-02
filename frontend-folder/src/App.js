import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import backgroundImage from './assets/background-image.png';

// Components
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import Inventory from './Components/Inventory';
import Alerts from './Components/Alerts';
import Donations from './Components/Donations';
import Reports from './Components/Reports';
import Chatbot from './Components/Chatbot';
import Login from './Components/Login';
import Register from './Components/Register'; // ✅ New import

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const location = useLocation();

  // ✅ Hide Sidebar on login and register pages
  const showSidebar = isLoggedIn && location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div className="app-container">
      {/* Blurred Background */}
      <div
        className="background-blur"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Foreground Content */}
      <div className="app">
        {showSidebar && <Sidebar />}

        <div className="main-content">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/inventory" element={isLoggedIn ? <Inventory /> : <Navigate to="/login" />} />
            <Route path="/alerts" element={isLoggedIn ? <Alerts /> : <Navigate to="/login" />} />
            <Route path="/donations" element={isLoggedIn ? <Donations /> : <Navigate to="/login" />} />
            <Route path="/reports" element={isLoggedIn ? <Reports /> : <Navigate to="/login" />} />
            <Route path="/chatbot" element={isLoggedIn ? <Chatbot /> : <Navigate to="/login" />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} /> {/* ✅ New route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;