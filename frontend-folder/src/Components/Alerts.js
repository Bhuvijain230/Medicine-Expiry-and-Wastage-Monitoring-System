import React, { useEffect, useState } from 'react';
import './Alerts.css';
import axios from 'axios';

const API_BASE_URL = 'https://medicine-expiry-and-wastage-monitoring-a0uu.onrender.com';

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const uid = localStorage.getItem('user_id');
    if (!uid) return;

    const fetchExpiringMedicines = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user-expiring-medicines/${uid}`);
        setAlerts(res.data);
      } catch (err) {
        console.error('Error fetching expiring medicines:', err);
      }
    };

    fetchExpiringMedicines();
  }, []);

  const filteredAlerts = alerts.filter((item) =>
    item.medicine_name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <p className="no-alerts"> No medicines nearing expiry!</p>
      ) : (
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Expiry Date</th>
              <th>Days Left</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((item, index) => (
              <tr key={index}>
                <td>{item.medicine_name}</td>
                <td>{item.expiry_date}</td>
                <td
                  className={`days-left ${
                    item.days_left <= 7 ? 'red' : item.days_left <= 15 ? 'orange' : ''
                  }`}
                >
                  {item.days_left} days
                </td>
                <td>{item.notes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Alerts;
