import { useNavigate, useParams } from "react-router-dom";
import { postService } from "../../api/post";
import { useEffect, useState } from "react";
import { isStringANumber } from "../../common/common";
import MySpin from "../../layout/MySpin";
import MessageSnackbar from "../../common/MessageSnackbar";
import { Post } from "../../types/post";
import { NoItemsV1 } from "../../common/NoItems";
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, Send } from "@mui/icons-material";
import PostItem from "./PostItem";
import PostModal from "./PostModal";

const PostPage = () => {
  const { getPostById, reaction } = postService();

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [post, setPost] = useState<Post | undefined>();
  const [openRePost, setOpenRePost] = useState<boolean>(false);

  const loadPost = async (id: number) => {
    setLoading(true);
    const response = await getPostById(id);
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setPost(response.value);
  };

  const reactionFunc = async (id: number) => {
    setLoading(true);
    const response = await reaction(id);
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setPost(
      post
        ? {
            ...post,
            reaction: !post.reaction,
            cantReactions: post.cantReactions + (post.reaction ? -1 : 1),
          }
        : undefined
    );
  };

  useEffect(() => {
    if (id && isStringANumber(id)) loadPost(parseInt(id));
  }, [id]);

  return (
    <>
      <MySpin loading={loading} />
      <MessageSnackbar
        open={errorMessage.length !== 0}
        handleClose={() => setErrorMessage("")}
        message={errorMessage}
      />
      {post ? (
        <div className="post-layout">
          <div className="post-header mb-1">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            <div className="ml-1">
              <Typography variant="h5">{`Post of ${post.profile.name}`}</Typography>
            </div>
          </div>
          <div className="post-container">
            <PostItem
              post={post}
              rePostFunc={() => setOpenRePost(true)}
              reactionFunc={() => reactionFunc(post.id)}
            />
          </div>
          <div className="post-message-editor">
            <TextField
              multiline
              maxRows={2}
              fullWidth
              placeholder="Comment on this post"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    I
                    <IconButton>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      ) : (
        <NoItemsV1 />
      )}
      {post && (
        <PostModal
          setLoading={setLoading}
          setErrorMessage={setErrorMessage}
          open={openRePost}
          rePostId={post.id}
          handleOk={() =>
            setPost({
              ...post,
              cantRePosts: post.cantRePosts + 1,
            })
          }
          handleClose={() => setOpenRePost(false)}
        />
      )}
    </>
  );
};

export default PostPage;
