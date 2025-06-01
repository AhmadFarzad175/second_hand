// api/axiosInstance.js
import axios from 'axios';
import { getToken } from './AuthRepository';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Change to your API base URL
});

axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
