import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    height: "54px",
  },
  button: {
    marginLeft: "2rem",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    height: "100%",
    width: "170px",
    border: "solid transparent 2px",  
    "&:hover": {
      border: "solid #3A8DFF 2px",  
      backgroundColor: theme.palette.common.white
    }
  },
}));

export const LinkToSignup = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root} >
      <Typography
        color="textSecondary"
        children="Don't have an account?"
      />
      <Button
        className={classes.button}
        children="Create account"
        variant="contained"
        onClick={() => history.push("/register")}
      />
    </Box>
  );
};

export const LinkToLogin = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root} >
      <Typography
        color="textSecondary"
        children="Already have an account?"
      />
      <Button
        className={classes.button}
        children="Login"
        variant="contained"
        onClick={() => history.push("/login")}
      />
    </Box>
  );
};