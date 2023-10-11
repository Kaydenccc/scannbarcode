import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'https://fc0qw89g-8000.asse.devtunnels.ms/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});
