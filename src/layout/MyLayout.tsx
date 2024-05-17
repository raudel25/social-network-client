import { Container, Grid } from "@mui/material";

const MyLayout = () => {
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={3}>
          a
        </Grid>
        <Grid item xs={6}>
          b
        </Grid>
        <Grid item xs={3}>
          c
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyLayout;
