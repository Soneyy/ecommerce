import axios from 'axios';
import store from '../redux/store'; 

const state = store.getState();
const accessToken = state.user.accessToken; 

const axiosInstance = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  headers: {
    'Content-Type': 'application/json',

    Authorization: `Bearer ${accessToken}`,
  },
});

export default axiosInstance;
