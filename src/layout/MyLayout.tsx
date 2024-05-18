import { CssBaseline, Grid } from "@mui/material";
import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";

const MyLayout = () => {
  return (
    <div className="layout">
      <CssBaseline />
      <Grid container>
        <Grid item xs={2}>
          <LeftLayout />
        </Grid>
        <Grid item xs={7}></Grid>
        <Grid item xs={3}>
          <RightLayout />
        </Grid>
      </Grid>
    </div>
  );
};

export default MyLayout;
