export const RestEnds = {
  LOGIN: "/api/v1/auth/login",
  SIGNUP: "/api/v1/auth/signup",
  LOGOUT: "/api/v1/auth/logout",
  CHECK_AUTH: "/api/v1/auth/me",
  UPLOAD_VIDEO: "/api/v1/upload/video",
  UPLOAD_INIT: "/api/v1/upload/initialize",
  UPLOAD_CHUNK: "/api/v1/upload/chunk",
  UPLOAD_COMPLETE: "/api/v1/upload/complete",
  ABORT_UPLOAD: "/api/v1/upload/abort",
  ALL_VIDEOS: "/api/v1/videos",
  VIDEO_BY_ID: (videoId) => `/api/v1/videos/${videoId}`,
  UPLOADED_VIDEOS: (userId) => `/api/v1/videos/user/${userId}`,
};
