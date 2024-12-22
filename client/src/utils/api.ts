import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Function to refresh the token
const refreshToken = async () => {
  const response = await api.post('/auth/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  localStorage.setItem('accessToken', response.data.accessToken);
  return response.data.accessToken;
};

// Interceptor to handle token expiration
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data.message === 'jwt expired' && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const fetchWeather = (city: string) => api.get(`/weather/${city}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
export const fetchNews = (country: string) => api.get(`/news/${country}`, {
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
});
export const registerUser = (data: any) => api.post('/auth/register', data);
export const loginUser = (data: any) => api.post('/auth/login', data);
export const getUserProfile = (token: string) => api.get('/auth/profile', {
  headers: { Authorization: `Bearer ${token}` },
});