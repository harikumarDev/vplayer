import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "./Layout";
import Videos from "./Video/Videos";
import { VideoServices } from "../services";
import { getErrMsg } from "../utils/helpers/functions";

function Home() {
  const [videos, setVideos] = useState(null);

  const getVideos = async () => {
    try {
      const { data } = await VideoServices.getAll();

      if (data.success) {
        setVideos(data.videos);
      }
    } catch (err) {
      toast.error(getErrMsg(err));
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <Layout className="mt-11">
      <Videos data={videos} className="p-8" />
    </Layout>
  );
}

export default Home;
