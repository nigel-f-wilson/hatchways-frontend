import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden"
  },
  form: {
    width: "90%",
    minWidth: "380px",
    height: "358px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  input: {
    height: "25%",
    fontSize: "1.2rem"
  },
  button: {
    width: "160px",
    height: "56px",
    margin: "0 auto",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      // border: "solid #3A8DFF 2px",
      backgroundColor: theme.palette.primary.dark
    }
  },

}));


export const LoginForm = (props) => {
  const { handleLogin } = props
  const classes = useStyles();
  return (
    <Box component="form"
      className={classes.form}
      onSubmit={handleLogin}
    >
      <Typography children="Welcome back!" variant="h2" />
      <FormControl margin="normal" required fullWidth className={classes.input} >
        <TextField
          label="Username"
          aria-label="username"
          name="username"
          type="text"
          autoComplete="off"
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth className={classes.input}  >
        <TextField
          label="Password"
          aria-label="password"
          type="password"
          name="password"
          autoComplete="off"
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

