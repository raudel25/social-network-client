import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import logo from "../assets/logo.jpg";
import ProfileLayout from "./ProfileLayout";
import Home from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const LeftLayout = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <div className="left-layout ">
      <img
        className="logo mb-5 ml-5"
        style={{ width: 60, height: 60 }}
        src={logo}
        alt="logo"
      />

      <List>
        {[
          ["Home", <Home />, "/home"],
          ["Profile", <PersonIcon />, `/profile/${user?.username}`],
        ].map(([text, icon, route], index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              style={{ borderRadius: 20 }}
              onClick={() => navigate(route as string)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>
        <Button variant="contained" style={{ width: "100%" }}>
          Post
        </Button>
      </div>
      <div className="end-left-layout">
        <ProfileLayout />
      </div>
    </div>
  );
};

export default LeftLayout;
