import APIManager from "../utils/Managers/APIManager";
import { RestEnds } from "./constants";

const video = async (data, config) =>
  APIManager.sendPost(RestEnds.UPLOAD_VIDEO, data, config);

export const UploadServices = {
  video,
};
