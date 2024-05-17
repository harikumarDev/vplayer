import React, { useState } from "react";
import { Box, Button, TextField, Input } from "@mui/material";
import { toast } from "react-toastify";
import Layout from "../Layout";

function Upload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();

  const handleUpload = (e) => {
    e.preventDefault();

    if (!title) {
      return toast.info("Title is required.");
    }

    console.log("File: ", file);
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
              value={file}
              onChange={(e) => setFile(e.target.value)}
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
