import { useNavigate, useParams } from "react-router-dom";
import { postService } from "../../api/post";
import React, { useContext, useEffect, useState } from "react";
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
import { profileService } from "../../api/profile";
import PostMessages from "./PostMessages";
import { UserContext } from "../../context/UserProvider";

const PostPage = () => {
  const { getPostById, reaction, message } = postService();
  const { followUnFollow } = profileService();

  const { id } = useParams();
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [post, setPost] = useState<Post | undefined>();
  const [openRePost, setOpenRePost] = useState<boolean>(false);
  const [messagePost, setMessagePost] = useState<string>("");

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

  const messageFunc = async () => {
    setLoading(true);
    const response = await message(post?.id ?? 0, {
      richText: { text: messagePost, html: `<p>${messagePost}</p>` },
    });
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setPost(
      post
        ? {
            ...post,
            cantMessages: post.cantMessages + 1,
            messages: post.messages.concat([
              {
                richText: { text: messagePost, html: `<p>${messagePost}</p>` },
                profile: userContext.user!.profile,
              },
            ]),
          }
        : undefined
    );
    setMessagePost("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Evita el salto de línea en el TextField
      messageFunc(); // Llama a la función cuando se presiona Enter
    }
  };

  const followUnFollowFunc = async () => {
    setLoading(true);
    const response = await followUnFollow(post?.profile.id ?? 0);
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setPost(
      post
        ? {
            ...post,
            profile: { ...post.profile, follow: !post.profile.follow },
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
            <div className="profile-container-child">
              <PostItem
                post={post}
                rePostFunc={() => setOpenRePost(true)}
                followUnFollowFunc={followUnFollowFunc}
                reactionFunc={() => reactionFunc(post.id)}
              />
              <PostMessages messages={post.messages} />
            </div>
          </div>
          <div className="post-message-editor">
            <TextField
              value={messagePost}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMessagePost(e.target.value)
              }
              onKeyDown={handleKeyDown}
              multiline
              maxRows={2}
              fullWidth
              placeholder="Comment on this post"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    I
                    <IconButton onClick={messageFunc}>
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
