import React, { useState } from "react";
import { Box, Button, TextField, Input } from "@mui/material";
import { toast } from "react-toastify";
import Layout from "../Layout";
import { UploadServices } from "../../services";
import { getErrMsg } from "../../utils/helpers/functions";

function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title) {
      return toast.info("Title is required.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const { data } = await UploadServices.video(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
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
