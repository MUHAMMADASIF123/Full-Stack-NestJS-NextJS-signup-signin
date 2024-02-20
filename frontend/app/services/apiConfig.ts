import { API_BASE_URL } from "../constants/api";
import axios from "axios";

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("customer");
        localStorage.removeItem("token");
      }
      window.location.href = "/login";
    }
  }
);

export default instance;
