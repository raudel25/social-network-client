import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import logo from "../assets/logo.jpg";
import ProfileLayout from "./ProfileLayout";
import Home from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useContext } from "react";
import { MyThemeThemeContext } from "../context/MyThemeProvider";

const LeftLayout = () => {
  const themeContext = useContext(MyThemeThemeContext);

  return (
    <div className="left-layout ">
      <div className="left-layout-header">
        <img
          className="logo mb-5"
          style={{ width: 80, height: 80 }}
          src={logo}
          alt="logo"
        />
        <IconButton
          onClick={() =>
            themeContext.setTheme(
              themeContext.currentTheme === "light" ? "dark" : "light"
            )
          }
        >
          {themeContext.currentTheme === "light" ? (
            <DarkModeIcon />
          ) : (
            <LightModeIcon />
          )}
        </IconButton>
      </div>
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
