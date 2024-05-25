import React from "react";
import { Link } from "react-router-dom";
import { CardContent, Typography } from "@mui/material";

function VideoCard({ video }) {
  const { _id, title, thumbnail, user, processed } = video;

  return (
    <Link
      to={processed ? `/watch/${_id}` : ""}
      className="mb-2 cursor-pointer rounded-lg overflow-hidden"
    >
      <div className="relative pb-[56.25%]">
        <img
          src={thumbnail || "/noimage.png"}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
        />
        {!processed && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 rounded-lg flex items-center justify-center">
            <Typography variant="h6" component="div" className="text-white">
              Processing...
            </Typography>
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
          <Typography component="div">
            {title.length > 60 ? title.substring(0, 60) + "..." : title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            margin={0}
          >
            {user.name}
          </Typography>
        </div>
      </CardContent>
    </Link>
  );
}

export default VideoCard;
