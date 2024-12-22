import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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