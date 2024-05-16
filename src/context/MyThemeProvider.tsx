import React, { useState, ReactNode, FC } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { PaletteMode, createTheme } from "@mui/material";

export const MyThemeThemeContext = React.createContext<{
  currentTheme: PaletteMode;
  setTheme: (newTheme: PaletteMode) => void;
}>({
  currentTheme: "light",
  setTheme: (newTheme: PaletteMode) => {},
});

export interface MyThemeProviderProps {
  children: ReactNode;
}

export const MyThemeThemeProvider: FC<MyThemeProviderProps> = ({
  children,
}) => {
  const [currentTheme, setCurrentTheme] = useState<PaletteMode>(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  const theme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });

  const setTheme = (newTheme: PaletteMode) => {
    localStorage.setItem("theme", newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <MyThemeThemeContext.Provider value={{ currentTheme, setTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </MyThemeThemeContext.Provider>
  );
};
