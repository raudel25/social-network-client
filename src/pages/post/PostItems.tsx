import { FC, useEffect, useState } from "react";
import { ApiResponse, Pagination } from "../../types/api";
import { Post } from "../../types/post";
import { Button, CircularProgress } from "@mui/material";
import { NoItemsV1, NoItemsV2 } from "../../common/NoItems";
import { postService } from "../../api/post";
import PostModal from "./PostModal";
import MySpin from "../../layout/MySpin";
import PostItem from "./PostItem";
import { profileService } from "../../api/profile";

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

  const { reaction } = postService();
  const { followUnFollow } = profileService();

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

  const followUnFollowFunc = async (id: number) => {
    setLoading(true);
    const response = await followUnFollow(
      pagination.rows.filter((p) => p.id == id)[0].profile.id
    );
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
              profile: { ...p.profile, follow: !p.profile.follow },
            }
          : p
      ),
    });
  };

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
      {pagination.rows.map((p) => (
        <PostItem
          post={p}
          followUnFollowFunc={() => followUnFollowFunc(p.id)}
          reactionFunc={() => reactionFunc(p.id)}
          rePostFunc={() => setRePost(p.rePost ? p.rePost.id : p.id)}
        />
      ))}
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
