import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    expiryDate: '',
    quantity: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  // ✅ Load inventory from localStorage on first load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('inventory'));
    if (stored) setInventory(stored);
  }, []);

  // ✅ Save inventory to localStorage every time it updates
  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  // ✅ Form field change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Add/Edit Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, batch, expiryDate, quantity } = formData;

    // 🛑 Validation
    if (!name || !batch || !expiryDate || !quantity) {
      alert('All fields are required.');
      return;
    }

    if (parseInt(quantity) <= 0) {
      alert('Quantity must be a positive number.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (expiryDate <= today) {
      alert('Expiry date must be in the future.');
      return;
    }

    // ✅ Add or Update
    if (editIndex !== null) {
      const updated = [...inventory];
      updated[editIndex] = formData;
      setInventory(updated);
      setEditIndex(null);
    } else {
      setInventory([...inventory, formData]);
    }

    // ✅ Reset form
    setFormData({ name: '', batch: '', expiryDate: '', quantity: '' });
  };

  // ✅ Delete handler
  const handleDelete = (index) => {
    const updated = [...inventory];
    updated.splice(index, 1);
    setInventory(updated);
  };

  // ✅ Edit handler
  const handleEdit = (index) => {
    setFormData(inventory[index]);
    setEditIndex(index);
  };

  return (
    <div className="inventory-container">
      <h2>Inventory Management</h2>

      <form onSubmit={handleSubmit} className="inventory-form">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Medicine Name"
          required
        />
        <input
          name="batch"
          value={formData.batch}
          onChange={handleChange}
          placeholder="Batch No."
          required
        />
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
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
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
      </form>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th>Expiry</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((med, index) => (
            <tr key={index}>
              <td>{med.name}</td>
              <td>{med.batch}</td>
              <td>{med.expiryDate}</td>
              <td>{med.quantity}</td>
              <td>
                <button onClick={() => handleEdit(index)}>✏️</button>
                <button onClick={() => handleDelete(index)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
