import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'https://apotikk.000webhostapp.com/api',
});
