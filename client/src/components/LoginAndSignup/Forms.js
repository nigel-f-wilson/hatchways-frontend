import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  input: {
    fontSize: "1.2rem"
  },
  button: {
    width: "160px",
    height: "56px",
    margin: "1rem auto",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark
    }
  },
}));

export const LoginForm = (props) => {
  const { login } = props
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    // const email = event.target.email.value;
    const password = event.target.password.value;
    await login({ username, password });
  };

  return (
    <Box component="form"
      className={classes.form}
      onSubmit={handleLogin}
    >
      <Typography children="Welcome back!" variant="h2" />
      {/* <FormControl margin="normal" required fullWidth className={classes.input} >
        <TextField
          label="E-mail address"
          aria-label="email"
          name="email"
          type="email"
          autoComplete="off"
          required
        />
      </FormControl> */}
      <FormControl margin="normal" required fullWidth className={classes.input} >
        <TextField
          label="Username"
          aria-label="username"
          name="username"
          type="text"
          autoComplete="off"
          required
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth className={classes.input}  >
        <TextField
          label="Password"
          aria-label="password"
          type="password"
          name="password"
          autoComplete="off"
          required
        />
      </FormControl>
      <Button 
        className={classes.button}
        type="submit" 
        variant="contained" 
      >
        Login
      </Button>
    </Box>
  )
}

export const SignupForm = (props) => {
  const { register } = props

  const classes = useStyles();
  const [error, setError] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords must match")
      // setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }
    else {
      setError(false)
    }
    await register({ username, email, password });
  };

  return (
    <Box component="form"
      className={classes.form}
      onSubmit={handleRegister}
    >
      <Typography children="Create an account." variant="h2" />
      <FormControl margin="normal" required fullWidth className={classes.input} >
        <TextField
          label="Username"
          aria-label="username"
          name="username"
          type="text"
          autoComplete="off"
          required
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth className={classes.input} >
        <TextField
          label="E-mail address"
          aria-label="email"
          name="email"
          type="email"
          autoComplete="off"
          required
        />
        {/* <FormHelperText children={error ? "Passwords must match" : null} /> */}
      </FormControl>
      <FormControl margin="normal" required fullWidth className={classes.input} error={error} >
        <TextField
          label="Password"
          aria-label="password"
          type="password"
          name="password"
          autoComplete="off"
          required
          inputProps={{ minLength: 6 }}
        />
        <FormHelperText children={error ? "Passwords must match" : null} />
      </FormControl>
      <FormControl margin="normal" required fullWidth className={classes.input} error={error} >
        <TextField
          label="Confirm Password"
          aria-label="confirm-password"
          type="password"
          name="confirmPassword"
          autoComplete="off"
          required
          inputProps={{ minLength: 6 }}
        />
        <FormHelperText children={error ? error : null} />
      </FormControl>
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
      >
        Create
      </Button>
    </Box>
  )
}

