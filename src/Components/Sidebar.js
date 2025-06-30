import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  PackageSearch,
  Bell,
  Gift,
  BarChart2,
  Bot
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
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

      {/* Footer or Role */}
      <div className="admin">Admin</div>
    </div>
  );
};

export default Sidebar;
