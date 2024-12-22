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
          <h3>{weatherData[0].city}, {weatherData[0].state ? `${weatherData[0].state}, ` : ''}{weatherData[0].country}</h3>
          {weatherData.map((day: any, index: number) => (
            <div key={index}>
              <p>{day.date}</p>
              <p>{day.iconDescription}</p>
              <p>Temperature: {day.tempF}°F</p>
              <p>Humidity: {day.humidity}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;