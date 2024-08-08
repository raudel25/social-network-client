import { Close } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { FC, useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import RichTextEditor from "../../common/RichTextEditor";
import UploadPhoto, { UploadPhotoState } from "../../context/UploadPhoto";
import { PostForm } from "../../types/post";
import { displayPhoto } from "../../common/common";
import { postService } from "../../api/post";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  display: "flex",
  flexDirection: "column",
};

interface PostModalProps {
  open: boolean;
  rePostId?: number;
  handleClose: () => void;
  setLoading: (loading: boolean) => void;
  setErrorMessage: (message: string) => void;
}

const PostModal: FC<PostModalProps> = ({
  open,
  handleClose,
  setLoading,
  setErrorMessage,
  rePostId,
}) => {
  const { newPost } = postService();

  const [formState, setFormState] = useState<PostForm>({
    richText: { text: "", html: "" },
    rePostId: rePostId,
  });

  useEffect(() => {
    setFormState({
      richText: { text: "", html: "" },
      rePostId: rePostId,
    });
  }, [open]);

  const handleOk = async () => {
    if (
      formState.richText.text.length === 0 &&
      formState.photoId === undefined
    ) {
      setErrorMessage("Your post cannot be empty");
      return;
    }

    handleClose();

    setLoading(true);
    const response = await newPost(formState);
    setLoading(false);

    if (!response.ok) setErrorMessage(response.message);
  };

  return (
    <Modal
      onClose={handleClose}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container alignItems={"center"}>
          <Grid xs={1} item></Grid>
          <Grid xs={10} item>
            <div className="center-content">
              <Typography variant="h5">New post</Typography>
            </div>
          </Grid>
          <Grid xs={1} item>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
        <div className="new-post-img-container">
          <IconButton component="label" role={undefined} tabIndex={-1}>
            <AddAPhotoIcon fontSize="large" />
            <UploadPhoto
              onChange={(state: UploadPhotoState) => {
                if (state.ok) {
                  setFormState({ ...formState, photoId: state.id });
                } else {
                  setErrorMessage(state.error || "Error uploading photo");
                }
              }}
              setLoading={setLoading}
            />
          </IconButton>
          {formState.photoId ? (
            <img
              style={{ width: 50, height: 50 }}
              src={displayPhoto(formState.photoId)}
              alt="img-post"
            />
          ) : (
            <></>
          )}
        </div>
        <RichTextEditor
          placeholder="Describe your post"
          onChange={(richText) =>
            setFormState({ ...formState, richText: richText })
          }
        />
        <div className="center-content" style={{ marginTop: "auto" }}>
          <Button
            variant="outlined"
            style={{ width: 300, fontSize: 16 }}
            onClick={handleOk}
          >
            Post
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default PostModal;
