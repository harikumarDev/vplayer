import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import VideoCard from "./VideoCard";
import { VideoServices } from "../../services";
import { useUserStore } from "../../utils/store";
import { getErrMsg } from "../../utils/helpers/functions";

function Videos(props) {
  const { user } = useUserStore();

  const { data, showEditOptions, className, getVideos } = props;

  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setForm({
      title: "",
    });
    setShowEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!form.title) {
      return toast.info("Title is required");
    }

    setLoading(true);
    try {
      const { data } = await VideoServices.edit(form._id, form);

      if (data.success) {
        await getVideos(user._id); // To update content (refresh) on page
        handleClose();
        setLoading(false);
        toast.success("Updated");
      }
    } catch (err) {
      toast.error(getErrMsg(err));
    }
  };

  const handleDelete = async (e, videoId) => {
    e.preventDefault();

    if (window.confirm("Confirm to delete?")) {
      try {
        const { data } = await VideoServices.delete(videoId);

        if (data.success) {
          await getVideos(user._id); // To update content (refresh) on page
          toast.success("Deleted successfully");
        }
      } catch (err) {
        toast.error(getErrMsg(err));
      }
    }
  };

  return (
    <div>
      <Container maxWidth={false} className={className}>
        <Grid container spacing={4}>
          {data?.map((video) => (
            <Grid item key={video._id} xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <VideoCard
                video={video}
                showEditOptions={showEditOptions}
                showEditDialog={showEdit}
                setShowEdit={setShowEdit}
                setForm={setForm}
                handleDelete={handleDelete}
              />
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

      <Dialog open={showEdit} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>Edit Video</DialogTitle>

        <form onSubmit={handleEdit}>
          <DialogContent>
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              value={form.title}
              onChange={handleChange}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="warning">
              Close
            </Button>
            <Button type="submit">
              {loading ? <CircularProgress size={15} /> : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Videos;
