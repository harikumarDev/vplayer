import React, { useState } from "react";
import { Box, Button, TextField, Input } from "@mui/material";
import { toast } from "react-toastify";
import Layout from "../Layout";
import { UploadServices } from "../../services";
import { getErrMsg } from "../../utils/helpers/functions";

function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const uploadInChunks = async (file, title) => {
    console.log("File: ", file);

    try {
      const initUpload = await UploadServices.initialize(); // Initializing the multipart upload

      if (!initUpload.data.success) {
        return;
      }

      const { uploadId, videoId, videoPath } = initUpload.data;

      const fileSize = file.size;
      const chunkSize = 5 * 1024 * 1024; // Chunk size in MB (Here, 5 MB)
      const totalChunks = Math.ceil(fileSize / chunkSize);
      console.log("Total chunks: ", totalChunks);

      const chunkPromises = [];

      for (let i = 0; i < totalChunks; ++i) {
        const from = chunkSize * i;
        const to = from + chunkSize;
        const chunk = file.slice(from, to);

        console.log("Uploading chunk: ", i);
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("index", i);
        formData.append("uploadId", uploadId);
        formData.append("videoPath", videoPath);

        // Uploading the chunks in parallel (without await) => faster with improved performance
        const chunkPromise = UploadServices.chunk(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        chunkPromises.push(chunkPromise);
      }

      // Awaiting for all the chunks to be uploaded
      await Promise.all(chunkPromises);

      const completeUpload = await UploadServices.complete({
        uploadId,
        title,
        videoId,
        videoPath,
      });

      console.log("Upload complete");

      return completeUpload.data;
    } catch (err) {
      console.log("Error uploading chunks: ", err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      return toast.info("Please select a video file to upload");
    }

    if (!title) {
      return toast.info("Title is required");
    }

    try {
      const data = await uploadInChunks(file, title);

      if (data.success) {
        console.log("New video: ", data);
        toast.success("Video uploaded");
      }
    } catch (err) {
      toast.error(getErrMsg(err));
    }
  };

  return (
    <Layout className="mt-11">
      <div className="p-6">
        <div className="inline-block">
          <h4 className="text-xl">Upload New</h4>
          <form
            className="flex flex-col gap-4 mx-4 my-6"
            onSubmit={handleUpload}
          >
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              size="small"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              type="file"
              variant="standard"
              size="small"
              onChange={(e) => setFile(e.target.files[0])}
              inputProps={{
                accept: "video/mp4,video/x-m4v,video/*",
              }}
              required
            />
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="inherit"
              style={{
                marginTop: "0.5em",
              }}
            >
              Submit
            </Button>
          </form>
        </div>

        <Box className="mt-4">
          <h3 className="text-2xl font-bold">My videos</h3>
          <div></div>
        </Box>
      </div>
    </Layout>
  );
}

export default Upload;
