import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://medicine-expiry-and-wastage-monitoring-a0uu.onrender.com/register', {
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone,
        password: formData.password
      });
      alert( res.data.message);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="login-box">
        <h2>Register</h2>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email address" onChange={handleChange} required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Create password" onChange={handleChange} required />
        <button type="submit">Register</button>
        <p>Already have an account? <span className="register-link" onClick={() => navigate('/login')}>Login</span></p>
      </form>
    </div>
  );
}

export default Register;
