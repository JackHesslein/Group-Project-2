import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import NewsCard from '../components/NewsCard';
import '../styles/Home.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);

    const token = localStorage.getItem('token');
    if (token) {
      try {
        await axios.post(
          '/api/auth/search-history', // Ensure this matches the route defined in authRoutes.ts
          { searchHistory: [searchInput] }, // Send searchHistory as an array
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error('Failed to save search history:', error);
      }
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <WeatherCard searchInput={searchQuery} />
      <NewsCard searchInput={searchQuery} />
    </div>
  );
};

export default Home;