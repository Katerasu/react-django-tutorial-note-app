import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiURL = '/choreo-apis/djangoreactnoteapp/backend/v1'

const api = axios.create({
  baseURL: apiURL,
});

// Add a request interceptor to the axios instance
api.interceptors.request.use(
  (config) => {
    // Get the access token from local storage
    const token = localStorage.getItem(ACCESS_TOKEN);
    // If the token exists, add it to the Authorization header of the request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Return the modified config
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
