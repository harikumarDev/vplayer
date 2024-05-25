import React from "react";
import { Link } from "react-router-dom";
import { CardContent, Typography } from "@mui/material";
import { useThemeStore } from "../../utils/store";
import { formatCreatedAt } from "../../utils/helpers/functions";

function VideoCard({ video }) {
  const { theme } = useThemeStore();

  const { _id, title, duration, user, thumbnailPath, isProcessed, createdAt } =
    video;

  const mediaUrl = import.meta.env.VITE_MEDIA_CLOUDFRONT_DOMAIN;

  return (
    <Link
      to={isProcessed ? `/watch/${_id}` : ""}
      className="mb-2 cursor-pointer rounded-lg overflow-hidden"
    >
      <div className="relative pb-[56.25%]">
        <img
          src={thumbnailPath ? `${mediaUrl}/${thumbnailPath}` : "/noimage.png"}
          alt={title}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg ${
            theme === "light" ? "bg-[#E5E5E5]" : "dark:bg-[#3F3F3F]"
          }`}
        />
        {!isProcessed && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 rounded-lg flex items-center justify-center">
            <Typography variant="h6" component="div" className="text-white">
              Processing...
            </Typography>
          </div>
        )}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black opacity-65 text-sm rounded-md px-1.5">
            <p className="font-semibold text-white">{duration}</p>
          </div>
        )}
      </div>

      <CardContent className="flex gap-2" style={{ padding: "12px 0" }}>
        <div>
          <span className="relative inline-block w-8">
            <img
              className="h-8 w-8 rounded-full"
              src={`https://eu.ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
            />
          </span>
        </div>
        <div>
          <Typography component="div" fontWeight={700}>
            {title.length > 60 ? title.substring(0, 60) + "..." : title}
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
              {user.name}
            </Typography>
            <Typography component="span" color="textSecondary" fontSize={12}>
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
              {formatCreatedAt(createdAt)}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Link>
  );
}

export default VideoCard;
