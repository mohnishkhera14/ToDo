import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import './LoginPage.css';


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      setToken(response.data.token);
      login(username, token);
      navigate('/dashboard');

    } catch (error) {
      alert('Invalid username or password');
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Page</h2>
      <input
        type="text"
        className="login-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="login-input"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="login-error">{error}</p>}
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
