import { useEffect, useRef, useState } from "react";
import { postService } from "../../api/post";
import PostItems from "../post/PostItems";
import MessageSnackbar from "../../common/MessageSnackbar";
import { useSearchParams } from "react-router-dom";
import ProfileItems from "../profile/ProfileItems";
import { profileService } from "../../api/profile";

const HomePage = () => {
  const { getPosts } = postService();
  const { search } = profileService();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchV, setSearchV] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const postItemsRef = useRef<{ reload: () => void }>(null);

  const handleReload = () => {
    postItemsRef.current?.reload();
  };

  useEffect(() => {
    if (searchParams.get("search")?.length ?? 0 > 0) {
      setSearchV(searchParams.get("search"));
      if (searchV) handleReload();
    } else {
      setSearchV(null);
      setSearchParams({});
    }
  }, [searchParams]);

  return (
    <>
      <MessageSnackbar
        open={errorMessage.length !== 0}
        handleClose={() => setErrorMessage("")}
        message={errorMessage}
      />
      <div className="home-container">
        {searchV ? (
          <ProfileItems
            ref={postItemsRef}
            load={(query: any) => search(searchParams.get("search")!, query)}
            setErrorMessage={setErrorMessage}
            allWindow={true}
          />
        ) : (
          <PostItems
            allWindow={true}
            load={(query: any) => getPosts(query)}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </>
  );
};

export default HomePage;
