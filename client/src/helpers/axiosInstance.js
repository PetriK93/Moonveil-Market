import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  // Allows sending cookies
  withCredentials: true,
});

export default axiosInstance;
