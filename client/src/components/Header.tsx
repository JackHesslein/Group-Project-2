import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className='py-3 border-bottom border-dark-subtle'>
      <nav>
        <Link className='text-decoration-none px-4' to="/">Home</Link>
        {token ? (
          <>
            <Link className='text-decoration-none px-4' to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className='text-decoration-none px-4' to="/login">Login</Link>
            <Link className='text-decoration-none px-4' to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;