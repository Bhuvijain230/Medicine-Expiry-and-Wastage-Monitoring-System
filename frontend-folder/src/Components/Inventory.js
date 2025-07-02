import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';

const API_BASE_URL = 'http://localhost:5000'; 
const userId = 1; 

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    medicine_name: '',
    manufacturer_name: '',
    mfg_date: '',
    expiry_date: '',
    notes: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user-logged-medicines/${userId}`);
      setInventory(res.data);
    } catch (err) {
      console.error('Error loading inventory:', err);
    }
  };

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
        // Update
        await axios.put(`${API_BASE_URL}/update-user-medicine/${editId}`, payload);
      } else {
        // Add
        await axios.post(`${API_BASE_URL}/log-medicine`, payload);
      }

      setFormData({ medicine_name: '', manufacturer_name: '', mfg_date: '', expiry_date: '', notes: '' });
      setEditId(null);
      fetchInventory();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete-user-medicine/${id}`);
      fetchInventory();
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
      notes: entry.notes
    });
    setEditId(entry.id);
  };

  return (
    <div className="inventory-container">
      <h2>User Medicine Inventory</h2>

      <form onSubmit={handleSubmit} className="inventory-form">
        <input name="medicine_name" value={formData.medicine_name} onChange={handleChange} placeholder="Medicine Name" required />
        <input name="manufacturer_name" value={formData.manufacturer_name} onChange={handleChange} placeholder="Manufacturer" />
        <input type="date" name="mfg_date" value={formData.mfg_date} onChange={handleChange} required />
        <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} required />
        <input name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes (optional)" />
        <button type="submit">{editId !== null ? 'Update' : 'Add'}</button>
      </form>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Manufacturer</th>
            <th>MFG Date</th>
            <th>Expiry</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((med) => (
            <tr key={med.id}>
              <td>{med.medicine_name}</td>
              <td>{med.manufacturer_name}</td>
              <td>{med.mfg_date}</td>
              <td>{med.expiry_date}</td>
              <td>{med.notes}</td>
              <td>
                <button onClick={() => handleEdit(med)}>✏️</button>
                <button onClick={() => handleDelete(med.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
