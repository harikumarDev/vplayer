import axios from "axios";
import { useUserStore } from "../store";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

// This logs out the user is in case of token expiry or token corrupted
axios.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err.response && err.response.status === 401) {
      useUserStore.getState().logout();
    }

    return Promise.reject(err);
  }
);

export default axios;
