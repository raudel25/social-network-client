import { Search, LightMode, DarkMode } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Suggestions from "../pages/home/Suggestions";
import { useContext, useState } from "react";
import { MyThemeThemeContext } from "../context/MyThemeProvider";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const RightLayout = () => {
  const themeContext = useContext(MyThemeThemeContext);
  const [search, setSearch] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const [_, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    if (location.pathname != "/home") navigate(`home?search=${search}`);
    else setSearchParams({ search: search });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita el salto de línea en el TextField
      handleSearch();
    }
  };

  return (
    <div className="right-layout">
      <TextField
        style={{ paddingRight: 17 }}
        fullWidth
        placeholder="Search"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={handleSearch}>
                <Search />
              </IconButton>
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
