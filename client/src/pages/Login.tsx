import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      //console.log('Login response:', response); // Log the response
      localStorage.setItem('token', response.data.token);
      history('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login pt-5 text-center">
      <h1 className='loginh1'>Login</h1>
      <form className="login-form pt-5 text-center" onSubmit={handleLogin}>
        <div className='d-flex flex-column text-center justify-content-center align-items-center'>
          <label htmlFor="username">Username:</label>
          <input
            className='rounded-3 text-center'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='pt-4 d-flex flex-column text-center justify-content-center align-items-center'>
          <label htmlFor="password pt-3">Password:</label>
          <input
            className='rounded-3 text-center'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='pt-4 text-center'>
          <button type="submit">Login</button>
        </div>
      </form>
      <p className='pt-2'>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;