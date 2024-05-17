import axios from "./AxiosManager";

class APIManager {
  getProvider() {
    return axios;
  }

  sendPost(url, data) {
    return this.getProvider().post(url, data);
  }

  sendPut(url, data) {
    return this.getProvider().put(url, data);
  }

  sendPatch(url, data) {
    return this.getProvider().patch(url, data);
  }

  sendGet(url) {
    return this.getProvider().get(url);
  }

  sendDelete(url) {
    return this.getProvider().delete(url);
  }
}

const instance = new APIManager();

export default instance;
