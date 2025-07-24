import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Donations.css';

const BASE_URL = 'http://localhost:5000';

const Donations = () => {
  const [city, setCity] = useState('');
  const [type, setType] = useState('hospitals');
  const [pincode, setPincode] = useState('');
  const [centres, setCentres] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [medicineForm, setMedicineForm] = useState({ name: '', mfg: '', expiry: '', quantity: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [donor, setDonor] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const stored = localStorage.getItem('donation_medicine');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      console.log("Loaded medicine from inventory:", parsed);
      setMedicineForm({
        name: parsed.name || '',
        mfg: parsed.mfg || '',
        expiry: parsed.expiry || '',
        quantity: parsed.quantity || ''
      });
      localStorage.removeItem('donation_medicine');
    } catch (err) {
      console.error('Error parsing stored medicine:', err);
    }
  }
}, []);


  const fetchCentres = async () => {
    if (!city) return alert('Please enter a city');
    try {
      const route =
        type === 'hospitals'
          ? `${BASE_URL}/get-hospitals?city=${city}&pincode=${pincode}`
          : `${BASE_URL}/wellness-centres?city=${city}&pincode=${pincode}`;
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
    const { name, mfg, expiry, quantity } = medicineForm;
    if (!name || !mfg || !expiry || !quantity) return alert('Fill all fields');
    const updated = [...medicines];
    if (editingIndex !== null) updated[editingIndex] = medicineForm;
    else updated.push(medicineForm);
    setMedicines(updated);
    setMedicineForm({ name: '', mfg: '', expiry: '', quantity: '' });
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
      mfg_date: med.mfg,
      expiry_date: med.expiry,
      quantity: med.quantity
    }));

    try {
      setLoading(true);
      await axios.post('/submit-donation', payload);
      alert('Donation submitted successfully!');
      setDonor('');
      setContact('');
      setMedicines([]);
      setSelectedCentre(null);
    } catch (err) {
      console.error(err);
      alert('Failed to submit donation');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="donations-container">
      <h1>Medicine Donation</h1>

      <div className="search-controls">
        <input type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="hospitals">Hospitals</option>
          <option value="wellness">Wellness Centres</option>
        </select>
        <input type="text" placeholder="Pincode (optional)" value={pincode} onChange={(e) => setPincode(e.target.value)} />
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
                {c.pincode && <p>Pincode: {c.pincode}</p>}
                {c.facility_type && <p>Facility Type: {c.facility_type}</p>}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.hospital_address || c.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
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
          <input name="mfg" type="date" placeholder="MFG Date" value={medicineForm.mfg} onChange={handleMedicineChange} />
          <input name="expiry" type="date" placeholder="Expiry Date" value={medicineForm.expiry} onChange={handleMedicineChange} />
          <input name="quantity" type="number" placeholder="Quantity" value={medicineForm.quantity} onChange={handleMedicineChange} min="1" />
          <button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button>
        </form>
      </div>

      {medicines.length > 0 && (
        <div className="donation-list">
          <h3>Medicines to Donate</h3>
          <ul>
            {medicines.map((m, i) => (
              <li key={i} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span><strong>Name:</strong> {m.name}</span>
                <span><strong>MFG:</strong> {formatDate(m.mfg)}</span>
                <span><strong>Expiry:</strong> {formatDate(m.expiry)}</span>
                <span><strong>Quantity:</strong> {m.quantity}</span>
                <button onClick={() => handleDelete(i)} style={{ marginLeft: 'auto' }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedCentre !== null && medicines.length > 0 && (
        <div className="donation-preview">
          <h3>Ready to Submit</h3>
          <input type="text" placeholder="Your Name" value={donor} onChange={(e) => setDonor(e.target.value)} />
          <input type="text" placeholder="Contact Info" value={contact} onChange={(e) => setContact(e.target.value)} />
          <button onClick={handleSubmitDonation} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Donation'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Donations;
