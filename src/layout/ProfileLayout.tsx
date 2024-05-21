import React, { useContext } from "react";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import MoreHorzIcon from "@mui/icons-material/MoreHoriz";
import { UserContext } from "../context/UserProvider";
import { Logout } from "@mui/icons-material";

const ProfileLayout = () => {
  const { user, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="avatar-container" onClick={handleOpen}>
        <Avatar alt={user?.username} src="" />
        <div className="ml-2 mr-1">
          <Typography
            variant="body1"
            className="mb-1"
            style={{ fontWeight: "bold" }}
          >
            {user?.profile.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            @{user?.username}
          </Typography>
        </div>
        <MoreHorzIcon className="more-icon" />
      </div>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: 60,
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          <Logout /> Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileLayout;
