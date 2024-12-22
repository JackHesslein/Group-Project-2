import axios from 'axios'; // Add this import
import dotenv from 'dotenv';

dotenv.config();

const WEATHER_API_URL = process.env.WEATHER_API_URL!;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY!;

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  name: string;
}

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};