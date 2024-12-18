import React, { useState } from 'react';
import './DisplayWeather.css'; // CSS for styling

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

const DisplayWeather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string>('');

  const API_KEY = 'eaab9747b5msh3121c53a3b8b80cp195bdbjsn600fe2d487c2'; // OpenWeather API key

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather({
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
      setError('');
    } catch (err: any) {
      setWeather(null);
      setError(err.message);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    } else {
      setError('Please enter a city name');
    }
  };

  return (
    <div className="display-weather">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.city}</h2>
          <p>Temperature: {weather.temperature}&#8451;</p>
          <p>Condition: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default DisplayWeather;
