import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../utils/api';
import './styles/WeatherCard.css';


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
            {weatherData.map((day: any, index: number) => (
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