import { FC, useContext } from "react";
import { Message } from "../../types/post";
import { Avatar, Box, Paper, Typography, useTheme } from "@mui/material";
import { displayPhoto } from "../../common/common";
import { UserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { NoItemsV2 } from "../../common/NoItems";

interface PostMessagesProps {
  messages: Message[];
}
const PostMessages: FC<PostMessagesProps> = ({ messages }) => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();

  if (messages.length === 0) return <NoItemsV2 />;

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
                  ? theme.palette.primary.main
                  : theme.palette.background.paper,
              color:
                message.profile.id == userContext.user!.profile.id
                  ? theme.palette.getContrastText(theme.palette.primary.main)
                  : theme.palette.text.primary,
              maxWidth: "70%",
            }}
          >
            <Typography variant="subtitle2">
              {message.profile.id == userContext.user!.profile.id
                ? "Me:"
                : `${message.profile.name}:`}
            </Typography>
            <Typography variant="body1">{message.richText.text}</Typography>
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

export default PostMessages;
