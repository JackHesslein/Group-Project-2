import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../utils/api';

interface WeatherCardProps {
  searchInput: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ searchInput }) => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    if (searchInput) {
      const handleSearch = async () => {
        try {
          const response = await fetchWeather(searchInput);
          setWeatherData(response.data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
      handleSearch();
    }
  }, [searchInput]);

  return (
    <div>
      <h2>Weather Information</h2>
      {weatherData && (
        <div>
          <h3>{weatherData[0].city}</h3>
          <p>{weatherData[0].iconDescription}</p>
          <p>Temperature: {weatherData[0].tempF}°F</p>
          <p>Humidity: {weatherData[0].humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;