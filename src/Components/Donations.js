import React, { useState, useEffect } from 'react';
import './Donations.css';

const ngos = [
  {
    name: 'Helping Hands Clinic',
    address: '456 Main St, Udaipur',
    policy: 'Accepts non-scheduled drugs within 3 months of expiry',
  },
  {
    name: 'Udaipur Charitable Trust',
    address: '789 Charity Rd, Udaipur',
    policy: 'Accepts non-scheduled drugs within 3 months of expiry',
  },
  {
    name: 'Care & Cure Foundation',
    address: '101 Health Ave, Udaipur',
    policy: 'Accepts non-scheduled drugs within 3 months of expiry',
  },
];

const Donations = () => {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    expiry: '',
    quantity: '',
    ngo: '',
    donor: '',
    contact: '',
  });
  const [donations, setDonations] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('donations')) || [];
    setDonations(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('donations', JSON.stringify(donations));
  }, [donations]);

  const filteredNGOs = ngos.filter((ngo) =>
    ngo.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...donations];
      updated[editIndex] = formData;
      setDonations(updated);
      setEditIndex(null);
    } else {
      setDonations([...donations, formData]);
    }
    alert('Donation saved successfully!');
    setFormData({
      name: '',
      batch: '',
      expiry: '',
      quantity: '',
      ngo: '',
      donor: '',
      contact: '',
    });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setFormData(donations[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = donations.filter((_, i) => i !== index);
    setDonations(updated);
    if (editIndex === index) {
      setFormData({
        name: '',
        batch: '',
        expiry: '',
        quantity: '',
        ngo: '',
        donor: '',
        contact: '',
      });
      setEditIndex(null);
    }
  };

  return (
    <div className="donations-container">
      <h1 className="donation-title">Medicine Donations</h1>

      <button className="donate-button" onClick={() => setShowForm(true)}>Add New Donation</button>

      {showForm && (
        <form className="donation-form" onSubmit={handleFormSubmit}>
          <h3>{editIndex !== null ? 'Edit' : 'Submit'} Donation</h3>
          <input
            type="text"
            placeholder="Medicine Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Batch No."
            required
            value={formData.batch}
            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
          />
          <input
            type="date"
            required
            value={formData.expiry}
            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            required
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
          <select
            required
            value={formData.ngo}
            onChange={(e) => setFormData({ ...formData, ngo: e.target.value })}
          >
            <option value="">Select NGO</option>
            {ngos.map((ngo, idx) => (
              <option key={idx} value={ngo.name}>{ngo.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Donor Name"
            required
            value={formData.donor}
            onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact Info"
            required
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />
          <button type="submit">Save</button>
          <button type="button" className="cancel-button" onClick={() => {
            setShowForm(false);
            setFormData({
              name: '',
              batch: '',
              expiry: '',
              quantity: '',
              ngo: '',
              donor: '',
              contact: '',
            });
            setEditIndex(null);
          }}>Cancel</button>
        </form>
      )}

      <h3 className="section-heading">All Donations</h3>
      {donations.length === 0 ? (
        <p>No donations added yet.</p>
      ) : (
        <table className="donation-table">
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Batch</th>
              <th>Expiry</th>
              <th>Qty</th>
              <th>NGO</th>
              <th>Donor</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index}>
                <td>{donation.name}</td>
                <td>{donation.batch}</td>
                <td>{donation.expiry}</td>
                <td>{donation.quantity}</td>
                <td>{donation.ngo}</td>
                <td>{donation.donor}</td>
                <td>{donation.contact}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>✏️</button>
                  <button onClick={() => handleDelete(index)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <input
        type="text"
        placeholder="Search NGOs"
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h3 className="section-heading">Available NGOs</h3>

      <div className="ngo-list">
        {filteredNGOs.map((ngo, index) => (
          <div className="ngo-card" key={index}>
            <h4>{ngo.name}</h4>
            <p>{ngo.address}</p>
            <p className="policy">{ngo.policy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donations;
