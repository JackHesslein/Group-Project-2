import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/api';
import '../styles/Register.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await registerUser({ username, password });
      console.log('User registered:', response.data);
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register pt-5 text-center">
      <h1 className='h1'>Register</h1>
      <form className="login-form pt-5 text-center" onSubmit={handleRegister}>
        <div className='d-flex flex-column text-center justify-content-center align-items-center'>
          <label>Username</label>
          <input
            className='rounded-3 text-center'
            type="text"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='pt-4 d-flex flex-column text-center justify-content-center align-items-center'>
          <label>Password</label>
          <input
            className='rounded-3 text-center'
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='pt-4 d-flex flex-column text-center justify-content-center align-items-center'>
          <label>Confirm Password</label>
          <input
            className='rounded-3 text-center'
            type="password"
            id="register-confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className='pt-4 text-center'>
        <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;