import { FC, useContext } from "react";
import { Message } from "../../types/post";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { displayPhoto } from "../../common/common";
import { UserContext } from "../../context/UserProvider";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

interface PostMessagesProps {
  messages: Message[];
}
const PostMessages: FC<PostMessagesProps> = ({ messages }) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Box>
      {messages.map((message, ind) => (
        <Box
          key={ind}
          display="flex"
          justifyContent={
            message.profile.id == userContext.user!.profile.id
              ? "flex-end"
              : "flex-start"
          }
          mb={2}
        >
          {message.profile.id != userContext.user!.profile.id && (
            <div
              className="pointer"
              onClick={() => navigate(`../profile/${message.profile.username}`)}
            >
              <Avatar
                src={displayPhoto(message.profile.profilePhotoId)}
                alt={message.profile.name}
                sx={{ marginRight: 1 }}
              />
            </div>
          )}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: "16px",
              bgcolor:
                message.profile.id == userContext.user!.profile.id
                  ? "primary.main"
                  : "background.paper",
              color:
                message.profile.id == userContext.user!.profile.id
                  ? "white"
                  : "text.primary",
              maxWidth: "70%", // Ajusta el ancho máximo del Paper
            }}
          >
            <Typography variant="subtitle2">
              {message.profile.id == userContext.user!.profile.id
                ? "Me:"
                : `${message.profile.name}:`}
            </Typography>
            <Typography variant="body1">
              {parse(message.richText.html)}
            </Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default PostMessages;
