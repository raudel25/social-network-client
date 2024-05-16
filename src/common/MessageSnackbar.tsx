import { Snackbar } from "@mui/material";
import { FC } from "react";

interface MessageSnackbarProps {
  open: boolean;
  handleClose: () => void;
  message: string;
}

const MessageSnackbar: FC<MessageSnackbarProps> = ({
  open,
  handleClose,
  message,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
    />
  );
};

export default MessageSnackbar;
