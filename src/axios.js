import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'https://apotikk.000webhostapp.com/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});
