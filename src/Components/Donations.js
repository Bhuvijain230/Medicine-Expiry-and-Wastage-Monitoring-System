import React, { useState } from 'react';
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
  const [medicines, setMedicines] = useState([]);
  const [medicineForm, setMedicineForm] = useState({ name: '', batch: '', expiry: '', quantity: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ ngo: '', donor: '', contact: '' });

  const handleMedicineChange = (e) => {
    setMedicineForm({ ...medicineForm, [e.target.name]: e.target.value });
  };

  const addOrEditMedicine = (e) => {
    e.preventDefault();

    if (!medicineForm.name || !medicineForm.batch || !medicineForm.expiry || !medicineForm.quantity) {
      alert('Please fill all medicine fields');
      return;
    }

    const updatedList = [...medicines];
    if (editingIndex !== null) {
      updatedList[editingIndex] = medicineForm;
    } else {
      updatedList.push(medicineForm);
    }

    setMedicines(updatedList);
    setMedicineForm({ name: '', batch: '', expiry: '', quantity: '' });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    setMedicineForm(medicines[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
    if (editingIndex === index) {
      setMedicineForm({ name: '', batch: '', expiry: '', quantity: '' });
      setEditingIndex(null);
    }
  };

  const filteredNGOs = ngos.filter((ngo) =>
    ngo.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (medicines.length === 0) {
      alert('Please add at least one medicine to donate.');
      return;
    }

    console.log('Donation Details:', {
      ngo: formData.ngo,
      donor: formData.donor,
      contact: formData.contact,
      medicines,
    });

    alert('Donation submitted successfully!');
    setFormData({ ngo: '', donor: '', contact: '' });
    setShowForm(false);
    setMedicines([]);
  };

  return (
    <div className="donations-container">
      <h1 className="donation-title">Medicine Donation</h1>

      <div className="medicine-form-wrapper">
        <h3 className="form-heading">
          {editingIndex !== null ? '✏️ Edit Medicine' : '➕ Add Medicine'}
        </h3>

        <form className="medicine-form" onSubmit={addOrEditMedicine}>
          <input
            type="text"
            name="name"
            placeholder="Medicine Name"
            value={medicineForm.name}
            onChange={handleMedicineChange}
            required
          />
          <input
            type="text"
            name="batch"
            placeholder="Batch No."
            value={medicineForm.batch}
            onChange={handleMedicineChange}
            required
          />
          <input
            type="date"
            name="expiry"
            value={medicineForm.expiry}
            onChange={handleMedicineChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={medicineForm.quantity}
            onChange={handleMedicineChange}
            required
            min="1"
          />
          <div className="form-buttons">
            <button type="submit">
              {editingIndex !== null ? 'Update Medicine' : 'Add Medicine'}
            </button>
            {editingIndex !== null && (
              <button
                type="button"
                className="cancel-edit"
                onClick={() => {
                  setEditingIndex(null);
                  setMedicineForm({ name: '', batch: '', expiry: '', quantity: '' });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {medicines.length > 0 && (
        <div className="donation-list">
          <h3>Medicines to Donate</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Batch</th>
                <th>Expiry</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((med, index) => (
                <tr key={index}>
                  <td>{med.name}</td>
                  <td>{med.batch}</td>
                  <td>{med.expiry}</td>
                  <td>{med.quantity}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="donate-button" onClick={() => setShowForm(true)}>Proceed to Donate</button>

      {showForm && (
        <form className="donation-form" onSubmit={handleFormSubmit}>
          <h3>Submit Donation</h3>
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
          <button type="submit">Submit Donation</button>
          <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
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
