import axios from 'axios';
import store from '../redux/store'; // Assuming your Redux store is configured

const state = store.getState();
const accessToken = state.user.accessToken; // Assuming accessToken is stored in user slice

const axiosInstance = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  headers: {
    'Content-Type': 'application/json',
    // Add Authorization header with dynamically retrieved Bearer token
    Authorization: `Bearer ${accessToken}`,
  },
});

export default axiosInstance;
