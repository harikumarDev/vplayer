import APIManager from "../utils/Managers/APIManager";
import { RestEnds } from "./constants";

const login = async (data) => APIManager.sendPost(RestEnds.LOGIN, data);

const signup = async (data) => APIManager.sendPost(RestEnds.SIGNUP, data);

const logout = async () => APIManager.sendGet(RestEnds.LOGOUT);

const checkAuth = async () => APIManager.sendGet(RestEnds.CHECK_AUTH);

export const AuthServices = {
  login,
  signup,
  logout,
  checkAuth,
};
