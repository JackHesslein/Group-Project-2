import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetchWeather = (city: string) => api.get(`/weather/${city}`);
export const fetchNews = (country: string) => api.get(`/news/${country}`);
export const registerUser = (data: any) => api.post('/auth/register', data);
export const loginUser = (data: any) => api.post('/auth/login', data);
export const getUserProfile = (token: string) => api.get('/auth/profile', {
  headers: { Authorization: `Bearer ${token}` },
});