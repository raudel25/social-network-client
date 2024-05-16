import logo from "../../assets/logo.jpg";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { MyThemeThemeContext } from "../../context/MyThemeProvider";
import { LoginForm } from "../../types/auth";

const SigIn = () => {
  const [error, setError] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const validator = (form: LoginForm) => {
    let isValid = true;
    let aux = { username: "", password: "" };

    for (const key in form) {
      if (form[key as keyof LoginForm] === "") {
        aux[key as keyof LoginForm] = "This field is required";
        isValid = false;
      }
    }

    if (form.password.length !== 8) {
      aux.password = "Password must be 8 characters long";
      isValid = false;
    }

    setError(aux);

    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const form = {
      password: (data.get("password") ?? "") as string,
      username: (data.get("username") ?? "") as string,
    };

    if (!validator(form)) return;

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const themeContext = useContext(MyThemeThemeContext);

  return (
    <Container component="main" maxWidth="xs">
      <div className="change-theme">
        <Button
          onClick={() =>
            themeContext.setTheme(
              themeContext.currentTheme === "light" ? "dark" : "light"
            )
          }
        >
          {themeContext.currentTheme === "light" ? (
            <DarkModeIcon />
          ) : (
            <LightModeIcon />
          )}
        </Button>
      </div>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="center-content mt-10">
          <img
            className="logo mb-1"
            style={{ width: 70, height: 70 }}
            src={logo}
            alt="logo"
          />
        </div>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={error.username !== ""}
                helperText={error.username}
                required
                fullWidth
                id="emailOrUsername"
                label="Email Address or User Name"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.password !== ""}
                helperText={error.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SigIn;
