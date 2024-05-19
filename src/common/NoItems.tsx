import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/Inbox";

export const NoItemsV2 = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="text.secondary"
    >
      <InboxIcon />
      <Typography variant="body1" gutterBottom>
        No items found
      </Typography>
    </Box>
  );
};

export const NoItemsV1 = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      color="text.secondary"
    >
      <InboxIcon style={{ fontSize: 80 }} />
      <Typography variant="h6" gutterBottom>
        No items found
      </Typography>
      <Typography variant="body2">
        There are no items to display at the moment.
      </Typography>
    </Box>
  );
};
