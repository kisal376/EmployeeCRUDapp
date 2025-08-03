// src/utils/axiosInstance.js
import axios from "axios";
import keycloak from "../components/keycloak"; // Adjust path if needed

const axiosInstance = axios.create({
  baseURL: "/api",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (keycloak && keycloak.token) {
      // Refresh token if needed
      try {
        await keycloak.updateToken(5); // refresh if expiring in 5s
        config.headers.Authorization = `Bearer ${keycloak.token}`;
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
