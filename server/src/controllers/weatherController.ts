import { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const WEATHER_API_URL = process.env.WEATHER_API_URL;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

if (!WEATHER_API_URL || !WEATHER_API_KEY) {
  throw new Error('WEATHER_API_URL or WEATHER_API_KEY is not defined in the environment variables');
}

interface Coordinates {
  lat: number;
  lon: number;
}

class Weather {
  constructor(
    public city: string,
    public state: string | null,
    public country: string,
    public date: string,
    public icon: string,
    public iconDescription: string,
    public tempF: number,
    public windSpeed: number,
    public humidity: number
  ) {}
}

const fetchLocationData = async (query: string): Promise<Coordinates & { city: string, state: string | null, country: string }> => {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${WEATHER_API_KEY}`
  );
  const locationData = response.data[0];
  return {
    lat: locationData.lat,
    lon: locationData.lon,
    city: locationData.name,
    state: locationData.state || null,
    country: locationData.country,
  };
};

const fetchCurrentWeatherData = async (coordinates: Coordinates) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${WEATHER_API_KEY}`
  );
  return response.data;
};

const fetchForecastData = async (coordinates: Coordinates) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${WEATHER_API_KEY}`
  );
  return response.data;
};

const parseCurrentWeather = (response: any, city: string, state: string | null, country: string) => {
  const currentWeather = response;
  return new Weather(
    city,
    state,
    country,
    new Date(currentWeather.dt * 1000).toLocaleDateString(),
    currentWeather.weather[0].icon,
    currentWeather.weather[0].description,
    currentWeather.main.temp,
    currentWeather.wind.speed,
    Math.round(currentWeather.main.humidity)
  );
};

const buildForecastArray = (currentWeather: Weather, forecastData: any[]) => {
  const forecastArray: Weather[] = [];

  forecastData.forEach((data: any, index: number) => {
    if (index % 8 === 0 && index < 40) { // Limit to 5-day forecast, 8 data points per day
      forecastArray.push(new Weather(
        currentWeather.city,
        currentWeather.state,
        currentWeather.country,
        new Date(data.dt * 1000).toLocaleDateString(),
        data.weather[0].icon,
        data.weather[0].description,
        data.main.temp,
        data.wind.speed,
        Math.round(data.main.humidity)
      ));
    }
  });

  return [currentWeather, ...forecastArray];
};

export const getWeather = async (req: Request, res: Response) => {
  const { city } = req.params;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const { lat, lon, city: cityName, state, country } = await fetchLocationData(city);
    const currentWeatherData = await fetchCurrentWeatherData({ lat, lon });
    const forecastData = await fetchForecastData({ lat, lon });
    const currentWeather = parseCurrentWeather(currentWeatherData, cityName, state, country);
    const forecast = buildForecastArray(currentWeather, forecastData.list);
    res.json(forecast);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};