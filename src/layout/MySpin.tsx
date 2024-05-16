import { FC } from "react";
import logo from "../assets/logo.jpg";
import { CircularProgress, Typography, useTheme } from "@mui/material";

const MySpin: FC<{ loading: boolean; initial?: boolean }> = ({
  loading,
  initial = false,
}) => {
  const theme = useTheme();

  return (
    <>
      {loading &&
        (initial ? (
          <div
            className="center-spin"
            style={{ backgroundColor: theme.palette.background.default }}
          >
            <div>
              <div className="layout-logo">
                <img className="logo mr-5" src={logo} alt="logo" />
                <Typography variant="h5" color="text.primary">
                  Matcom Social
                </Typography>
              </div>
              <div className="center-content mt-5">
                <CircularProgress />
              </div>
            </div>
          </div>
        ) : (
          <div className="center-spin">
            <CircularProgress />
          </div>
        ))}
    </>
  );
};

export default MySpin;
