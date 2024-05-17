import axios from "./AxiosManager";
import { defaultAxiosConfig } from "../helpers/constants";

class APIManager {
  getProvider() {
    return axios;
  }

  sendPost(url, data, config = defaultAxiosConfig) {
    return this.getProvider().post(url, data, config);
  }

  sendPut(url, data, config = defaultAxiosConfig) {
    return this.getProvider().put(url, data, config);
  }

  sendPatch(url, data, config = defaultAxiosConfig) {
    return this.getProvider().patch(url, data, config);
  }

  sendGet(url, config = defaultAxiosConfig) {
    return this.getProvider().get(url, config);
  }

  sendDelete(url, config = defaultAxiosConfig) {
    return this.getProvider().delete(url, config);
  }
}

const instance = new APIManager();

export default instance;
