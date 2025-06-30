import React, { useEffect } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';

const cards = [
  {
    title: 'Manage Inventory',
    desc: 'View and add medicines to your inventory',
    icon: '📋',
    path: '/inventory',
  },
  {
    title: 'View Alerts',
    desc: 'Check notifications for medicines nearing expiry',
    icon: '📅',
    path: '/alerts',
  },
  {
    title: 'Find Donations',
    desc: 'Explore options for donating unused medicines',
    icon: '🤝',
    path: '/donations',
  },
  {
    title: 'Generate Reports',
    desc: 'Analyze data on medicine usage and wastage',
    icon: '📊',
    path: '/reports',
  },
];

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="home">
      <h1 className="home-title">Home</h1>

      <h2 className="home-subtitle">
        Welcome to the Medicine Expiry & Wastage Monitoring System
      </h2>

      <p className="home-description">
        Track and manage your medicine inventory, receive alerts for expiring items,
        and find opportunities for donation.
      </p>

      <div className="card-grid">
        {cards.map((card, index) => (
          <Link to={card.path} key={index} className="card-link">
            <div className="card">
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
