import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure your styles are correctly defined

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect to home if already logged in
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login (dummy auth)
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

        <p className="helper-text">Forgot your password?</p>
        <p className="helper-text">
          New user?{' '}
          <span className="register-link" onClick={() => navigate('/register')}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
