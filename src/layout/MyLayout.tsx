import { Container, CssBaseline, Grid } from "@mui/material";
import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";

const MyLayout = () => {
  return (
    <Container component="main">
      <CssBaseline />
      <Grid container>
        <Grid item xs={2.5}>
          <LeftLayout />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={3.5}>
          <RightLayout />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyLayout;
