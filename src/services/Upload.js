import APIManager from "../utils/Managers/APIManager";
import { RestEnds } from "./constants";

const video = async (data, config) =>
  APIManager.sendPost(RestEnds.UPLOAD_VIDEO, data, config);

const initialize = async () => APIManager.sendGet(RestEnds.UPLOAD_INIT);

const chunk = async (data, config) =>
  APIManager.sendPost(RestEnds.UPLOAD_CHUNK, data, config);

const complete = async (data) =>
  APIManager.sendPost(RestEnds.UPLOAD_COMPLETE, data);

export const UploadServices = {
  video,
  initialize,
  chunk,
  complete,
};
