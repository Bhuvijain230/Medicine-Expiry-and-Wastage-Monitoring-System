import React, { useState } from 'react';
import axios from 'axios';
import './Donations.css';

const BASE_URL = 'http://localhost:5000';
const Donations = () => {
  const [city, setCity] = useState('');
  const [type, setType] = useState('hospitals');
  const [centres, setCentres] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [medicineForm, setMedicineForm] = useState({ name: '', batch: '', expiry: '', quantity: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [donor, setDonor] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCentres = async () => {
    if (!city) return alert('Please enter a city');
    try {
      let route = '';
if (type === 'hospitals') {
  route = `${BASE_URL}/get-hospitals?city=${city}`;
} else {
  route = `${BASE_URL}/wellness-centres?city=${city}`;

}
      const response = await axios.get(route);
      setCentres(response.data);
      setSelectedCentre(null);
    } catch (err) {
      console.error(err);
      alert('No centres found or error occurred');
      setCentres([]);
    }
  };

  const handleMedicineChange = (e) => {
    setMedicineForm({ ...medicineForm, [e.target.name]: e.target.value });
  };

  const addOrEditMedicine = (e) => {
    e.preventDefault();
    const { name, batch, expiry, quantity } = medicineForm;
    if (!name || !batch || !expiry || !quantity) return alert('Fill all fields');
    const updated = [...medicines];
    if (editingIndex !== null) updated[editingIndex] = medicineForm;
    else updated.push(medicineForm);
    setMedicines(updated);
    setMedicineForm({ name: '', batch: '', expiry: '', quantity: '' });
    setEditingIndex(null);
  };

  const handleDelete = (i) => {
    setMedicines(medicines.filter((_, index) => index !== i));
  };

  const handleSubmitDonation = async () => {
    if (!donor || !contact || selectedCentre === null) {
      alert('Please complete all donation details');
      return;
    }

    const centre = centres[selectedCentre];
    const payload = medicines.map(med => ({
      donor_name: donor,
      contact_info: contact,
      city,
      centre_type: type === 'hospitals' ? 'hospital' : 'wellness',
      centre_name: centre.hospital_name || centre.wellness_centre_name,
      medicine_name: med.name,
      batch_no: med.batch,
      expiry_date: med.expiry,
      quantity: med.quantity
    }));

    try {
      setLoading(true);
      const res = await axios.post('/submit-donation', payload);
      alert('Donation submitted successfully!');
      setDonor('');
      setContact('');
      setMedicines([]);
      setSelectedCentre(null);
    } catch (err) {
      console.error(err);
      alert(' Failed to submit donation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donations-container">
      <h1>Medicine Donation</h1>

      <div className="search-controls">
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="hospitals">Hospitals</option>
          <option value="wellness">Wellness Centres</option>
        </select>
       
        <button onClick={fetchCentres}>Search Centres</button>
      </div>

      {centres.length > 0 && (
        <div className="centre-list">
          <h3>Select a Donation Point</h3>
          {centres.map((c, i) => (
            <label key={i} className="centre-radio">
              <input
                type="radio"
                name="centre"
                value={i}
                checked={selectedCentre === i}
                onChange={() => setSelectedCentre(i)}
              />
              <div className={`centre-card ${selectedCentre === i ? 'selected' : ''}`}>
                <h4>{c.hospital_name || c.wellness_centre_name}</h4>
                <p>{c.hospital_address || c.address}</p>
                <p className="policy">Accepts medicines before expiry</p>
              </div>
            </label>
          ))}
        </div>
      )}

      <div className="medicine-form-wrapper">
        <h3>Add Medicine</h3>
        <form onSubmit={addOrEditMedicine} className="medicine-form">
          <input name="name" placeholder="Name" value={medicineForm.name} onChange={handleMedicineChange} />
          <input name="batch" placeholder="Batch" value={medicineForm.batch} onChange={handleMedicineChange} />
          <input name="expiry" type="date" value={medicineForm.expiry} onChange={handleMedicineChange} />
          <input name="quantity" type="number" value={medicineForm.quantity} onChange={handleMedicineChange} />
          <button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
        </form>
      </div>

      {medicines.length > 0 && (
        <div className="donation-list">
          <h3>Medicines to Donate</h3>
          <ul>
            {medicines.map((m, i) => (
              <li key={i}>
                {m.name} - {m.batch} - {m.expiry} - Qty: {m.quantity}
                <button onClick={() => handleDelete(i)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCentre !== null && medicines.length > 0 && (
        <div className="donation-preview">
          <h3>Ready to Submit</h3>
          <input
            type="text"
            placeholder="Your Name"
            value={donor}
            onChange={(e) => setDonor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact Info"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <button onClick={handleSubmitDonation} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Donation'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Donations;