import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorProps {
  errorCode?: number;
  errorMessage?: string;
}

const ErrorPage: React.FC<ErrorProps> = ({ errorCode = 404, errorMessage = 'Page not found' }) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Redirect to the home page or desired route
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1 style={{ fontSize: '3rem', color: '#ff6f61' }}>{errorCode}</h1>
      <p style={{ fontSize: '1.5rem', color: '#333' }}>{errorMessage}</p>
      <button
        onClick={handleBackToHome}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
