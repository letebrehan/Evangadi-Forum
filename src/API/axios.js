import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:2224/api",
});

export default axiosInstance;
