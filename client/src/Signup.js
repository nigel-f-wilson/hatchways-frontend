import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";

import { makeStyles } from "@material-ui/core/styles";
import WelcomeHeader from "./components/LoginAndSignup/WelcomeHeader";
import { LinkToLogin } from "./components/LoginAndSignup/Navigation";
import { SignupForm } from "./components/LoginAndSignup/Forms";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  formArea: {
    height: "60vh",
    minHeight: "400px"
  },
  topRight: {
    height: "60px",
    position: "absolute",
    top: "2rem",
    right: "3rem",
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { user, register } = props;

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root}  >
      <Grid item xs={5} >
        <WelcomeHeader />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={5} className={classes.formArea} >
        <SignupForm 
          handleRegister={handleRegister} 
          formErrorMessage={formErrorMessage}
        />
      </Grid>
      <Box className={classes.topRight} >
        <LinkToLogin />
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
