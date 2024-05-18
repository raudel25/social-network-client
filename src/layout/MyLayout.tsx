import { Container, CssBaseline, Grid } from "@mui/material";
import LeftLayout from "./LeftLayout";

const MyLayout = () => {
  return (
    <Container component="main">
      <CssBaseline />
      <Grid container>
        <Grid item xs={3}>
          <LeftLayout />
        </Grid>
        <Grid item xs={6}>
          b
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Container>
  );
};

export default MyLayout;
