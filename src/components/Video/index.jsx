import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress, Typography } from "@mui/material";
// import videojs from "video.js";
import Layout from "../Layout";
import Player from "./Player";
import { VideoServices } from "../../services";
import { getPlayerOptions } from "../../utils/helpers/constants";
import { formatCreatedAt, getErrMsg } from "../../utils/helpers/functions";

function Video() {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);

  const getVideo = async () => {
    try {
      const { data } = await VideoServices.getById(videoId);

      if (data.success) {
        setVideo(data.video);
      }
    } catch (err) {
      toast.error(getErrMsg(err));
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      // videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      // videojs.log("player will dispose");
    });
  };

  return (
    <Layout className="mt-11">
      <div className="pt-1 md:pt-10">
        {video ? (
          <div className="flex items-center justify-center flex-col">
            <Player
              options={getPlayerOptions(video.url, true)}
              onReady={handlePlayerReady}
            />

            <div className="flex gap-3 py-4 px-2 self-start md:self-center">
              <div>
                <span className="relative inline-block w-8">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`https://eu.ui-avatars.com/api/?name=${video.user.name}`}
                    alt={video.user.name}
                  />
                </span>
              </div>
              <div className="-mt-1">
                <Typography component="div" fontWeight={700}>
                  {video.title}
                </Typography>
                <div className="flex items-center gap-1">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    margin={0}
                    fontWeight={500}
                    fontSize={14}
                  >
                    {video.user.name}
                  </Typography>
                  <Typography
                    component="span"
                    color="textSecondary"
                    fontSize={12}
                  >
                    &#8226;
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    margin={0}
                    fontWeight={500}
                    fontSize={14}
                  >
                    {formatCreatedAt(video.createdAt)}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <CircularProgress size={25} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Video;
