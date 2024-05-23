import React, { useState } from "react";
import { Box, Button, TextField, Input, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import Layout from "../Layout";
import { UploadServices } from "../../services";
import { getErrMsg } from "../../utils/helpers/functions";

function Upload() {
  const [form, setForm] = useState({
    title: "",
    video: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    const updatedForm = {
      ...form,
      [name]: name === "video" ? files[0] : value,
    };

    setForm(updatedForm);
  };

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

    const { title, video } = form;

    if (!video) {
      return toast.info("Please select a video file to upload");
    }

    // Limiting the file size as it is a test app and to avoid huge AWS bill (-_-)
    const MAX_FILE_SIZE = 250 * 1024 * 1024; // 250 MB
    if (video.size > MAX_FILE_SIZE) {
      return toast.info("Select a file less than a 250 MB");
    }

    if (!title) {
      return toast.info("Title is required");
    }

    setLoading(true);
    try {
      const data = await uploadInChunks(video, title);

      if (data.success) {
        console.log("New video: ", data);

        setForm({
          title: "",
          video: "",
        });

        toast.success("Video uploaded");
      }
    } catch (err) {
      toast.error(getErrMsg(err));
    } finally {
      setLoading(false);
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
              value={form.title}
              onChange={handleChange}
              required
            />
            <Input
              name="video"
              type="file"
              variant="standard"
              size="small"
              onChange={handleChange}
              inputProps={{
                accept: "video/mp4,video/x-m4v,video/*",
              }}
              required
            />
            <Button
              type="submit"
              size="small"
              variant="contained"
              style={{
                marginTop: "0.5em",
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
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
