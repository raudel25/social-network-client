import { FC, useEffect, useState } from "react";
import { ApiResponse, Pagination } from "../../types/api";
import { Post } from "../../types/post";
import {
  Avatar,
  Button,
  CircularProgress,
  Link,
  Typography,
} from "@mui/material";
import { NoItemsV1, NoItemsV2 } from "../../common/NoItems";
import { useNavigate } from "react-router-dom";
import { displayPhoto } from "../../common/common";
import parse from "html-react-parser";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { postService } from "../../api/post";
import PostModal from "./PostModal";
import dayjs from "dayjs";
import MySpin from "../../layout/MySpin";

interface PostItemsProps {
  allWindow?: boolean;
  load: (query: any) => Promise<ApiResponse<Pagination<Post>>>;
  setErrorMessage: (errorMessage: string) => void;
}

const PostItems: FC<PostItemsProps> = ({
  load,
  setErrorMessage,
  allWindow = false,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rePost, setRePost] = useState<number | undefined>();
  const [pagination, setPagination] = useState<Pagination<Post>>({
    limit: 10,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    rows: [],
  });

  const navigate = useNavigate();
  const { reaction } = postService();

  const loadPosts = async (clear: boolean) => {
    setLoading(true);
    const response = await load({
      limit: pagination.limit,
      page: clear ? 1 : pagination.page + 1,
    });
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setPagination(
      clear
        ? { ...response.value!, rows: response.value!.rows ?? [] }
        : {
            ...response.value!,
            rows: [...pagination.rows, ...(response.value!.rows ?? [])],
          }
    );
  };

  useEffect(() => {
    loadPosts(true);

    // eslint-disable-next-line
  }, []);

  const reactionFunc = async (id: number) => {
    setLoading(true);
    const response = await reaction(id);
    setLoading(false);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    setPagination({
      ...pagination,
      rows: pagination.rows.map((p) =>
        p.id == id
          ? {
              ...p,
              reaction: !p.reaction,
              cantReactions: p.cantReactions + (p.reaction ? -1 : 1),
            }
          : p
      ),
    });
  };

  const getItem = (post: Post, showFooter: boolean = true) => (
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
        {post.photoId && (
          <div className="mb-5 center-content">
            <img src={displayPhoto(post.photoId)}></img>
          </div>
        )}
        <div className="mb-1">{parse(post.richText?.html ?? "")}</div>
        {post.rePost && (
          <div className="mt-5">{getItem(post.rePost, false)}</div>
        )}
        {showFooter && (
          <div className="post-items-icons">
            <Button>
              <ChatBubbleOutlineOutlinedIcon fontSize="small" />
              <span className="ml-1">
                <Typography variant="body1">{post.cantMessages}</Typography>
              </span>
            </Button>
            <Button
              onClick={() => setRePost(post.rePost ? post.rePost.id : post.id)}
            >
              <RepeatOutlinedIcon fontSize="small" />
              <span className="ml-1">
                <Typography variant="body1">{post.cantRePosts}</Typography>
              </span>
            </Button>
            <Button onClick={() => reactionFunc(post.id)}>
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

  if (loading) {
    return allWindow ? (
      <MySpin loading={loading} />
    ) : (
      <div className="center-content">
        <CircularProgress size={30} />
      </div>
    );
  }

  return (
    <>
      {pagination.totalRows === 0 &&
        (allWindow ? <NoItemsV1 /> : <NoItemsV2 />)}
      {pagination.rows.map((p) => getItem(p))}
      <div className="center-content">
        {pagination.page < pagination.totalPages && (
          <Button onClick={() => loadPosts(false)}>See more</Button>
        )}
      </div>
      <PostModal
        setLoading={setLoading}
        setErrorMessage={setErrorMessage}
        open={rePost != null}
        rePostId={rePost}
        handleOk={() =>
          setPagination({
            ...pagination,
            rows: pagination.rows.map((p) =>
              p.id == rePost
                ? {
                    ...p,
                    cantRePosts: p.cantRePosts + 1,
                  }
                : p
            ),
          })
        }
        handleClose={() => setRePost(undefined)}
      />
    </>
  );
};

export default PostItems;
