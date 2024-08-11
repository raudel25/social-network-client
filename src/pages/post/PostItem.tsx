import { FC } from "react";
import { Post } from "../../types/post";
import { useNavigate } from "react-router-dom";
import { displayPhoto } from "../../common/common";
import { Avatar, Button, Link, Typography } from "@mui/material";
import dayjs from "dayjs";
import parse from "html-react-parser";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

interface PostItemProps {
  post: Post;
  rePostFunc?: () => void;
  reactionFunc?: () => void;
}

const PostItem: FC<PostItemProps> = ({ post, rePostFunc, reactionFunc }) => {
  const navigate = useNavigate();

  return (
    <div className="post-items-container" key={post.id}>
      <div className="post-items-header">
        <div
          className="post-item-name pointer"
          onClick={() => navigate(`../profile/${post.profile.username}`)}
        >
          <Avatar
            alt={post.profile.username}
            src={displayPhoto(post.profile.profilePhotoId)}
            style={{ width: 50, height: 50 }}
          />
          <div className="ml-2 mr-1 ">
            <Link
              variant="body1"
              className="mb-1 "
              style={{ fontWeight: "bold" }}
            >
              {post.profile.name}
            </Link>
            <Typography variant="body1" color="textSecondary">
              @{post.profile.username}
            </Typography>
          </div>
        </div>
        <div style={{ height: 50 }}>
          <Typography variant="subtitle2">
            {dayjs(post.date).format("DD MMM YYYY")}
          </Typography>
          <Typography variant="subtitle2" align="center">
            {dayjs(post.date).format("h:mm A")}
          </Typography>
        </div>
      </div>
      <div className="post-items-body">
        <div className="pointer" onClick={() => navigate(`../post/${post.id}`)}>
          {post.photoId && (
            <div className="mb-5 center-content">
              <img src={displayPhoto(post.photoId)}></img>
            </div>
          )}
          <div className="mb-1">{parse(post.richText?.html ?? "")}</div>
          {post.rePost && (
            <div className="mt-5">
              <PostItem post={post.rePost} />
            </div>
          )}
        </div>
        {rePostFunc && reactionFunc && (
          <div className="post-items-icons">
            <Button onClick={() => navigate(`../post/${post.id}`)}>
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
              <span className="ml-1">
                <Typography variant="body1">{post.cantMessages}</Typography>
              </span>
            </Button>
            <Button onClick={rePostFunc}>
              <RepeatOutlinedIcon fontSize="small" />
              <span className="ml-1">
                <Typography variant="body1">{post.cantRePosts}</Typography>
              </span>
            </Button>
            <Button onClick={reactionFunc}>
              {post.reaction ? (
                <FavoriteOutlinedIcon fontSize="small" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="small" />
              )}
              <span className="ml-1">
                <Typography variant="body1">{post.cantReactions}</Typography>
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
