export const defaultAxiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

// overrideNative for IOS devices
export const getPlayerOptions = (url, overrideNative) => ({
  autoplay: true,
  controls: true,
  responsive: true,
  fluid: true,
  playbackRates: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  controlBar: {
    playToggle: true,
    volumePanel: {
      inline: false,
    },
    fullscreenToggle: true,
  },
  plugins: {
    httpSourceSelector: { default: "auto" },
  },
  html5: {
    vhs: {
      overrideNative: overrideNative,
      withCredentials: true,
    },
    nativeVideoTracks: !overrideNative,
    nativeAudioTracks: !overrideNative,
    nativeTextTracks: !overrideNative,
  },
  sources: [
    {
      src: url,
      type: "application/x-mpegURL",
    },
  ],
});
