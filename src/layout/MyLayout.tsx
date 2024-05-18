import { Container, CssBaseline, Grid } from "@mui/material";

const MyLayout = () => {
  return (
    <Container component="main">
      <CssBaseline />
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          b
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Container>
  );
};

export default MyLayout;
