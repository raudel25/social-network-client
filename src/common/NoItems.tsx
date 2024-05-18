import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InboxIcon from "@mui/icons-material/Inbox";

const NoItems = () => {
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

export default NoItems;
