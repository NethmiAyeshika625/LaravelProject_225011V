import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Backend URL
  withCredentials: true, // Enable for CSRF and cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
