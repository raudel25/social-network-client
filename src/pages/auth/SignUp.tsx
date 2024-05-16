import logo from "../../assets/logo.jpg";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { MyThemeThemeContext } from "../../context/MyThemeProvider";
import { RegisterForm } from "../../types/auth";
import { authService } from "../../api/auth";
import MySpin from "../../layout/MySpin";
import MessageSnackbar from "../../common/MessageSnackbar";

const SignUp = () => {
  const { signUp } = authService();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [error, setError] = useState<{
    name: string;
    username: string;
    email: string;
    password: string;
    confirm: string;
  }>({ email: "", password: "", confirm: "", name: "", username: "" });

  const validator = (form: RegisterForm) => {
    let isValid = true;
    let aux = { email: "", password: "", confirm: "", name: "", username: "" };

    for (const key in form) {
      if (form[key as keyof RegisterForm] === "") {
        aux[key as keyof RegisterForm] = "This field is required";
        isValid = false;
      }
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email)) {
      aux.email = "Invalid email";
      isValid = false;
    }

    if (form.password.length !== 8) {
      aux.password = "Password must be 8 characters long";
      isValid = false;
    }

    if (form.password !== form.confirm) {
      aux.confirm = "Passwords don't match";
      isValid = false;
    }

    setError(aux);

    return isValid;
  };

  const signUpFunc = async (form: RegisterForm) => {
    setLoading(true);
    const res = await signUp(form);
    setLoading(false);

    if (!res.ok) {
      setErrorMessage(res.message);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const form = {
      email: (data.get("email") ?? "") as string,
      password: (data.get("password") ?? "") as string,
      confirm: (data.get("confirm") ?? "") as string,
      name: (data.get("name") ?? "") as string,
      username: (data.get("username") ?? "") as string,
    };

    if (!validator(form)) return;

    signUpFunc(form);
  };

  const themeContext = useContext(MyThemeThemeContext);

  return (
    <Container component="main" maxWidth="xs">
      <MessageSnackbar
        open={errorMessage.length !== 0}
        handleClose={() => setErrorMessage("")}
        message={errorMessage}
      />
      <MySpin loading={loading} />
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
                error={error.name !== ""}
                helperText={error.name}
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.username !== ""}
                helperText={error.username}
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.email !== ""}
                helperText={error.email}
                required
                fullWidth
                id="email"
                label="Email Address"
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
            <Grid item xs={12}>
              <TextField
                error={error.confirm !== ""}
                helperText={error.confirm}
                required
                fullWidth
                name="confirm"
                label="Confirm Password"
                type="password"
                id="confirm"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
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
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
