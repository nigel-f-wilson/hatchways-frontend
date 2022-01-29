import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, Paper } from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";

import { makeStyles } from "@material-ui/core/styles";
import WelcomeHeader from "./components/LoginAndSignup/WelcomeHeader";
import { LinkToLogin } from "./components/LoginAndSignup/Navigation";
import { SignupForm } from "./components/LoginAndSignup/Forms";

import { useScreenWidth } from "./hooks";


const useStyles = makeStyles((theme) => ({
  desktopRoot: {
    overflow: "hidden",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  desktopSidebar: {
    height: "100vh",
  },
  desktopFormArea: {
    height: "40vh",
    minHeight: "300px",
    minWidth: "380px",
    paddingRight: "5%"
  },
  topRight: {
    height: "60px",
    position: "absolute",
    top: "2rem",
    right: "3rem",
  },
  mobileRoot: {
    width: "100vw",
    minHeight: "850px",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    position: "relative",
  },
  mobileHeader: {
    width: "100vw",
    height: "100vh",
  },
  mobilePaper: {
    margin: "-20vh 0 3rem",
    width: "90%",
    maxWidth: "600px",
    padding: "1.5rem",
    height: "auto",
    minHeight: "450px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Signup = (props) => {
  const classes = useStyles();
  const width = useScreenWidth()
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

  if (width > 850) {
    return <DesktopLayout />
  } else {
    return <MobileLayout />
  }

  function DesktopLayout() {
    return (
      <Grid container className={classes.desktopRoot} >
        <Grid item xs={5} className={classes.desktopSidebar} >
          <WelcomeHeader />
        </Grid>
        <Grid item xs={1} md={false} />
        <Grid item xs={5} className={classes.desktopFormArea} >
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
  }

  function MobileLayout() {
    return (
      <Box container className={classes.mobileRoot} >
        <WelcomeHeader className={classes.mobileHeader} />
        <Paper className={classes.mobilePaper} >
          <SignupForm
            handleRegister={handleRegister}
            formErrorMessage={formErrorMessage}
          />
          <LinkToLogin />
        </Paper>
      </Box>
    );
  }
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
