import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useThemeStore, useUserStore } from "../../utils/store";
import { formatCreatedAt } from "../../utils/helpers/functions";

function VideoCard(props) {
  const {
    video,
    showEditOptions,
    showEditDialog,
    setShowEdit,
    setForm,
    handleDelete,
  } = props;

  const { theme } = useThemeStore();
  const { user: authenticatedUser } = useUserStore();

  const { _id, title, duration, user, thumbnailPath, isProcessed, createdAt } =
    video;

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const mediaUrl = import.meta.env.VITE_MEDIA_CLOUDFRONT_DOMAIN;

  const onAction = (e) => {
    e.stopPropagation();
  };

  const handleEditOpen = (e) => {
    e.preventDefault();

    setForm({
      title,
      _id,
    });

    setShowEdit(true);
    setHovered(false);
  };

  return (
    <Link
      to={isProcessed ? `/watch/${_id}` : ""}
      className="mb-2 cursor-pointer rounded-lg overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative pb-[56.25%] overflow-hidden">
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

        {/* Show Edit options for authorized users (uploader) */}
        {authenticatedUser?._id === user._id &&
          showEditOptions &&
          !showEditDialog && (
            <div
              className={`absolute top-0 right-0 h-full flex flex-col gap-2 items-end mt-4 transform transition-transform duration-300 ${
                hovered ? "translate-x-0" : "translate-x-full"
              }`}
              onClick={onAction}
            >
              <div
                className={`rounded-l px-2 bg-opacity-75 ${
                  theme === "light" ? "bg-white" : "bg-gray-500"
                }`}
                onClick={handleEditOpen}
              >
                <IconButton size="small">
                  <Edit />
                </IconButton>
              </div>
              <div
                className={`rounded-l px-2 bg-opacity-75 ${
                  theme === "light" ? "bg-white" : "bg-gray-500"
                }`}
                onClick={(e) => handleDelete(e, _id)}
              >
                <IconButton size="small" color="error">
                  <Delete />
                </IconButton>
              </div>
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
