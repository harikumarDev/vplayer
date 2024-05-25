import APIManager from "../utils/Managers/APIManager";
import { RestEnds } from "./constants";

const getAll = async () => APIManager.sendGet(RestEnds.ALL_VIDEOS);

const getById = async (videoId) =>
  APIManager.sendGet(RestEnds.VIDEO_BY_ID(videoId));

const getUploaded = async (userId) =>
  APIManager.sendGet(RestEnds.UPLOADED_VIDEOS(userId));

export const VideoServices = {
  getAll,
  getById,
  getUploaded,
};
