import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api', // or whatever your backend base URL is
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
