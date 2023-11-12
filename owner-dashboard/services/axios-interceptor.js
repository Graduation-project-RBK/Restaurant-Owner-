import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:3000",
});

customAxios.interceptors.request.use(
  async (config) => {
    config.headers["Authorization"] =
      "Bearer" + " " + localStorage.getItem("token");

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
