import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/login', {
      email,
      password
    });
    alert('✅ ' + res.data.message);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('user_id', res.data.user.id);  
    navigate('/');
  } catch (err) {
    console.error(err);
    alert('❌ Login failed');
  }
};


  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <h2>Login</h2>
        <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Log in</button>
        <p className="helper-text">Forgot your password?</p>
        <p className="helper-text">New user? <span className="register-link" onClick={() => navigate('/register')}>Sign up</span></p>
      </form>
    </div>
  );
}

export default Login;
