import { Search, LightMode, DarkMode } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Suggestions from "../pages/home/Suggestions";
import { useContext } from "react";
import { MyThemeThemeContext } from "../context/MyThemeProvider";

const RightLayout = () => {
  const themeContext = useContext(MyThemeThemeContext);
  return (
    <div className="right-layout">
      <TextField
        fullWidth
        placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  themeContext.setTheme(
                    themeContext.currentTheme === "light" ? "dark" : "light"
                  )
                }
              >
                {themeContext.currentTheme === "light" ? (
                  <DarkMode />
                ) : (
                  <LightMode />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="right-layout-container mt-5">
        <div className="right-layout-container-child">
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default RightLayout;
