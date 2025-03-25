import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3456/api",
});

export default axiosInstance;
