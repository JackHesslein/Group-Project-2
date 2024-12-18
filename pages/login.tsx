
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }

    // Clear the error if validation passes
    setError('');

    // Simulate login
    onLogin(username);
    navigate('/dashboard'); // Redirect to a dashboard or home page
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Login</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: '0.5rem',
            width: '100%',
            boxSizing: 'border-box',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
      <button
        onClick={handleLogin}
        style={{
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: '#007BFF',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
