import { useState } from "react";
import { postService } from "../../api/post";
import PostItems from "../post/PostItems";
import MessageSnackbar from "../../common/MessageSnackbar";

const HomePage = () => {
  const { getPosts } = postService();
  const [errorMessage, setErrorMessage] = useState<string>("");
  return (
    <>
      <MessageSnackbar
        open={errorMessage.length !== 0}
        handleClose={() => setErrorMessage("")}
        message={errorMessage}
      />
      <div className="home-container">
        <PostItems
          allWindow={true}
          load={(query: any) => getPosts(query)}
          setErrorMessage={setErrorMessage}
        />
      </div>
    </>
  );
};

export default HomePage;
