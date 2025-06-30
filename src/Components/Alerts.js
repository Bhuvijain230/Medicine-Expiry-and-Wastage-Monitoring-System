import React, { useEffect, useState } from 'react';
import './Alerts.css';
import dayjs from 'dayjs';

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // ✅ Load inventory data from localStorage
    const inventory = JSON.parse(localStorage.getItem('inventory')) || [];

    const today = dayjs();

    // ✅ Filter medicines expiring in next 30 days
    const filtered = inventory
      .map((item) => {
        const daysLeft = dayjs(item.expiryDate).diff(today, 'day');
        return { ...item, daysLeft };
      })
      .filter((item) => item.daysLeft >= 0 && item.daysLeft <= 30);

    setAlerts(filtered);
  }, []);

  const filteredAlerts = alerts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="alerts-container">
      <h1 className="alerts-header">Alerts</h1>

      <div className="alerts-controls">
        <input
          type="text"
          placeholder="Search medicine"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h3 className="alerts-subheading">Medicines Nearing Expiry (Next 30 Days)</h3>

      {filteredAlerts.length === 0 ? (
        <p className="no-alerts">🎉 No medicines nearing expiry!</p>
      ) : (
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Days Left</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.expiryDate}</td>
                <td>{item.quantity}</td>
                <td
                  className={`days-left ${
                    item.daysLeft <= 7 ? 'red' : item.daysLeft <= 15 ? 'orange' : ''
                  }`}
                >
                  {item.daysLeft} days
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Alerts;
