import React from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import VideoCard from "./VideoCard";

function Videos({ data, ...props }) {
  return (
    <Container maxWidth={false} {...props}>
      <Grid container spacing={4}>
        {data?.map((video) => (
          <Grid item key={video._id} xs={12} sm={6} md={4} lg={3} xl={2.4}>
            <VideoCard video={video} />
          </Grid>
        ))}

        {data?.length === 0 && (
          <div className="flex w-full pt-8 items-center justify-center">
            <Typography color="textSecondary" component="p" margin={0}>
              No Videos
            </Typography>
          </div>
        )}

        {!data && (
          <div className="flex w-full pt-8 h-48 items-center justify-center">
            <CircularProgress size={25} />
          </div>
        )}
      </Grid>
    </Container>
  );
}

export default Videos;
