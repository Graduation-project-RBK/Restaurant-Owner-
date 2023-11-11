import axios from 'axios';
import store from "../src/features/store.js"

const customAxios = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

customAxios.interceptors.request.use(
  async (config) => {
    const { auth } = store.getState();
    const token = auth.token;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
