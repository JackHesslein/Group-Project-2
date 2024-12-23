import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import NewsCard from '../components/NewsCard';
import '../index.css';
import '../styles/Home.css';
import '../components/Footer';



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

    const inputCity = (e.target as HTMLFormElement).city.value.trim();
    if (inputCity) {
      setCity(inputCity);
    }
  };

  return (
    <div>
      <h1 className= 'Todays Weather'> </h1>
      <form onSubmit={handleSearch} className="mb-6 flex">
        <input
          type="text"
          name="city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter city..."
        />
        <button type="submit"
        className="p-2 bg-blue-700 rounded-r-lg hover:bg-blue-800"
        >
        Search</button>
      </form>
      <WeatherCard searchInput={searchQuery} main={{
        temp: 0,
        humidity: 0
      }} sys={{
        country: ''
      }} weather={[]} wind={{
        speed: 0
      }} />
      <NewsCard searchInput={searchQuery} />
    </div>
  );
};


function setCity(_inputCity: any) {
    throw new Error('Function not implemented.');
  }

export default Home;