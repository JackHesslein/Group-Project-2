import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../utils/api';
import '../styles/weathercard.css';

interface WeatherData {
  city: string;
  state?: string;
  country: string;
  date: string;
  tempF: number;
  humidity: number;
}

interface WeatherCardProps {
  searchInput: string;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: any[];
  wind: {
    speed: number;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ searchInput, main, sys, weather, wind }) => {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);

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
    <div className='WeatherCard'>
      <h2>Weather Information</h2>
      {weatherData && (
        <div>
          <h3>{weatherData[0].city}, {weatherData[0].state ? `${weatherData[0].state}, ` : ''}{weatherData[0].country}</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Temperature (°F)</th>
                <th>Humidity (%)</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.map((day, index) => (
                <tr key={index}>
                  <td>{day.date}</td>
                  <td>{day.tempF}°F</td>
                  <td>{day.humidity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;