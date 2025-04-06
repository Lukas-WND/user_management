import axios from "axios";
import { API_URL } from "../config/urls";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      toast.error(error.response.data.message || "Unauthorized access");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
