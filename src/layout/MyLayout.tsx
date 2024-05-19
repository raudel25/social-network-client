import { CssBaseline, Grid } from "@mui/material";
import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";
import WebRouter from "../routes/WebRouter";

const MyLayout = () => {
  return (
    <div className="layout">
      <CssBaseline />
      <Grid container>
        <Grid item xs={2.5}>
          <LeftLayout />
        </Grid>
        <Grid item xs={6.5}>
          <div className="center-layout">
            <WebRouter />
          </div>
        </Grid>
        <Grid item xs={3}>
          <RightLayout />
        </Grid>
      </Grid>
    </div>
  );
};

export default MyLayout;
