import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://medicine-expiry-and-wastage-monitoring-a0uu.onrender.com';

const Inventory = () => {
  const [userId, setUserId] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    medicine_name: '',
    manufacturer_name: '',
    mfg_date: '',
    expiry_date: '',
    quantity: '',
    notes: ''
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchInventory(storedUserId);
    }
  }, []);

  const fetchInventory = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user-logged-medicines/${id}`);
      setInventory(res.data);
    } catch (err) {
      console.error('Error loading inventory:', err);
    }
  };

  const filteredInventory = inventory.filter((med) => {
    const term = searchTerm.toLowerCase();
    return (
      med.medicine_name.toLowerCase().includes(term) ||
      (med.manufacturer_name && med.manufacturer_name.toLowerCase().includes(term)) ||
      (med.mfg_date && med.mfg_date.toLowerCase().includes(term)) ||
      (med.expiry_date && med.expiry_date.toLowerCase().includes(term)) ||
      (med.notes && med.notes.toLowerCase().includes(term)) ||
      (med.quantity && med.quantity.toString().toLowerCase().includes(term))
    );
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      user_id: userId
    };

    try {
      if (editId !== null) {
        await axios.put(`${API_BASE_URL}/update-user-medicine/${editId}`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/log-medicine`, payload);
      }

      setFormData({
        medicine_name: '',
        manufacturer_name: '',
        mfg_date: '',
        expiry_date: '',
        quantity: '',
        notes: ''
      });
      setEditId(null);
      fetchInventory(userId);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete-user-medicine/${id}`);
      fetchInventory(userId);
    } catch (err) {
      console.error('Error deleting medicine:', err);
    }
  };

  const handleEdit = (entry) => {
    setFormData({
      medicine_name: entry.medicine_name,
      manufacturer_name: entry.manufacturer_name,
      mfg_date: entry.mfg_date,
      expiry_date: entry.expiry_date,
      quantity: entry.quantity || '',
      notes: entry.notes
    });
    setEditId(entry.id);
  };

  const handleDonate = (med) => {
    const donationData = {
      name: med.medicine_name,
      manufacturer: med.manufacturer_name,
      mfg: med.mfg_date,
      expiry: med.expiry_date,
      quantity: med.quantity || '',
    };
    localStorage.setItem('donation_medicine', JSON.stringify(donationData));
    navigate('/donations');
  };

  return (
    <div className="inventory-container">
      <h1>User Medicine Inventory</h1>

      <input
        type="text"
        placeholder="Search inventory..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
        style={{ marginBottom: '16px', padding: '8px', width: '100%', maxWidth: '400px' }}
      />

      <form onSubmit={handleSubmit} className="inventory-form">
        <input
          name="medicine_name"
          value={formData.medicine_name}
          onChange={handleChange}
          placeholder="Medicine Name"
          required
        />
        <input
          name="manufacturer_name"
          value={formData.manufacturer_name}
          onChange={handleChange}
          placeholder="Manufacturer"
        />
        <input
          type="date"
          name="mfg_date"
          value={formData.mfg_date}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <input
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes (optional)"
        />
        <button type="submit" className="Add-btn">
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </form>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Manufacturer</th>
            <th>MFG Date</th>
            <th>Expiry</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((med) => (
            <tr key={med.id}>
              <td>{med.medicine_name}</td>
              <td>{med.manufacturer_name}</td>
              <td>{med.mfg_date}</td>
              <td>{med.expiry_date}</td>
              <td>{med.quantity}</td>
              <td>{med.notes}</td>
              <td>
                <button className="Edit-btn" onClick={() => handleEdit(med)}>Edit</button>
                <button className="Del-btn" onClick={() => handleDelete(med.id)}>Delete</button>
                <button className="Donate-btn" onClick={() => handleDonate(med)}>Donate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
