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

const LeftLayout = () => {
  return (
    <div className="left-layout ">
      <img
        className="logo mb-5"
        style={{ width: 80, height: 80 }}
        src={logo}
        alt="logo"
      />
      <List>
        {[
          ["Home", <Home />],
          ["Profile", <PersonIcon />],
        ].map(([text, icon], index) => (
          <ListItem key={index}>
            <ListItemButton style={{ borderRadius: 20 }}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained">Post</Button>
      <div className="end-left-layout">
        <ProfileLayout />
      </div>
    </div>
  );
};

export default LeftLayout;
