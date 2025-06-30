import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Add cute styling here like the image

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login (you can use hardcoded email/password if needed)
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
        <p>Forgot your password?</p>
        <p><a href="#">New user? Sign up</a></p>
      </form>
    </div>
  );
}

export default Login;
