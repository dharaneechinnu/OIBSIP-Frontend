import axios from 'axios';

const api = axios.create({
  baseURL: 'https://oibsip-backend-swbk.onrender.com/'
});

export default api;