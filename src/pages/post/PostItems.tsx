import { FC, useEffect, useState } from "react";
import { ApiResponse, Pagination } from "../../types/api";
import { Post } from "../../types/post";
import { Button, CircularProgress } from "@mui/material";
import { NoItemsV2 } from "../../common/NoItems";

interface PostItemsProps {
  load: (query: any) => Promise<ApiResponse<Pagination<Post>>>;
  setErrorMessage: (errorMessage: string) => void;
}

const PostItems: FC<PostItemsProps> = ({ load, setErrorMessage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination<Post>>({
    limit: 10,
    page: 0,
    totalRows: 0,
    totalPages: 0,
    rows: [],
  });

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

  const getItem = (p: Post) => <div key={p.id}>{p.id}</div>;

  if (loading) {
    return (
      <div className="center-content">
        <CircularProgress size={30} />
      </div>
    );
  }

  return (
    <>
      {pagination.totalRows === 0 && <NoItemsV2 />}
      {pagination.rows.map((p) => getItem(p))}
      <div className="center-content">
        {pagination.page < pagination.totalPages && (
          <Button onClick={() => loadPosts(false)}>See more</Button>
        )}
      </div>
    </>
  );
};

export default PostItems;
