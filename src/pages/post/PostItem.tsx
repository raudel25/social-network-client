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
import { FC, useContext } from "react";
import DropdownMenu from "../../common/DropdownMenu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { UserContext } from "../../context/UserProvider";

interface PostItemProps {
  post: Post;
  rePostFunc?: () => void;
  reactionFunc?: () => void;
  followUnFollowFunc?: () => void;
}

const PostItem: FC<PostItemProps> = ({
  post,
  rePostFunc,
  reactionFunc,
  followUnFollowFunc,
}) => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

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
        <div className="center-content">
          <Typography variant="subtitle2" color="textSecondary">
            {dayjs(post.date).format("DD MMM YYYY h:mm A")}
          </Typography>
          {followUnFollowFunc && (
            <div className="ml-5">
              <DropdownMenu
                options={(userContext.user!.profile.id != post.profile.id
                  ? [
                      {
                        text: post.profile.follow
                          ? "Following this user"
                          : "Follow this user",
                        action: followUnFollowFunc,
                        icon: <PersonOutlineIcon fontSize="small" />,
                      },
                    ]
                  : []
                ).concat([
                  {
                    text: "See reactions",
                    action: () => {},
                    icon: <FavoriteBorderOutlinedIcon fontSize="small" />,
                  },
                  {
                    text: "See re posts",
                    action: () => {},
                    icon: <RepeatOutlinedIcon fontSize="small" />,
                  },
                ])}
              />
            </div>
          )}
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
