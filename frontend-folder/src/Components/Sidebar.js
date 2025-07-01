import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  PackageSearch,
  Bell,
  Gift,
  BarChart2,
  Bot,
  LogOut
} from 'lucide-react'; // Include LogOut icon
import './Sidebar.css';
import logo from '../assets/logo.png'; // Adjust path if needed

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Clear login state
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      {/* Sidebar Title */}
      <h2 className="sidebar-title">
        MEDICINE EXPIRY <br /> & WASTAGE <br /> MONITORING SYSTEM
      </h2>

      {/* Navigation Menu */}
      <ul className="sidebar-menu">
        <li className={isActive('/') ? 'active' : ''}>
          <Link to="/">
            <Home size={20} className="sidebar-icon" />
            <span>Home</span>
          </Link>
        </li>
        <li className={isActive('/inventory') ? 'active' : ''}>
          <Link to="/inventory">
            <PackageSearch size={20} className="sidebar-icon" />
            <span>Inventory</span>
          </Link>
        </li>
        <li className={isActive('/alerts') ? 'active' : ''}>
          <Link to="/alerts">
            <Bell size={20} className="sidebar-icon" />
            <span>Alerts</span>
          </Link>
        </li>
        <li className={isActive('/donations') ? 'active' : ''}>
          <Link to="/donations">
            <Gift size={20} className="sidebar-icon" />
            <span>Donations</span>
          </Link>
        </li>
        <li className={isActive('/reports') ? 'active' : ''}>
          <Link to="/reports">
            <BarChart2 size={20} className="sidebar-icon" />
            <span>Reports</span>
          </Link>
        </li>
        <li className={isActive('/chatbot') ? 'active' : ''}>
          <Link to="/chatbot">
            <Bot size={20} className="sidebar-icon" />
            <span>Chatbot</span>
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} className="sidebar-icon" />
          <span>Logout</span>
        </button>
        <div className="admin">Admin</div>
      </div>
    </div>
  );
};

export default Sidebar;