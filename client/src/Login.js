import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box } from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

import { makeStyles } from "@material-ui/core/styles";
import WelcomeHeader from "./components/LoginAndSignup/WelcomeHeader";
import { LinkToSignup } from "./components/LoginAndSignup/Navigation";
import { LoginForm } from "./components/LoginAndSignup/Forms";

import { useScreenWidth } from "./hooks";

const useStyles = makeStyles((theme) => ({
  desktopRoot: {
    overflow: "hidden",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  mobileRoot: {
    overflow: "scroll",
    display: "flex",
    alignItems: "center",
  },
  formArea: {
    height: "40vh",
    minHeight: "300px"
  },
  topRight: {
    height: "60px",
    position: "absolute",
    top: "2rem",
    right: "3rem",    
  },
  mobileHeader: {
    height: "100vh",

  },
  desktopSidebar: {
    height: "100vh",

  }
}));

const Login = (props) => {
  const classes = useStyles();
  const width = useScreenWidth()

  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
          <Grid item xs={5} className={classes.formArea} >
            <LoginForm handleLogin={handleLogin} />
          </Grid>
          <Box className={classes.topRight} >
            <LinkToSignup />
          </Box>
        </Grid>
    );
  }

  function MobileLayout() {
    return (
        <Grid container className={classes.mobileRoot} >
          <Grid item xs={12} className={classes.mobileHeader}>
            <WelcomeHeader />
          </Grid>
          <Grid item xs={1} md={0} />
          <Grid item xs={5} className={classes.formArea} >
            <LoginForm handleLogin={handleLogin} />
          </Grid>
          <Box className={classes.topRight} >
            <LinkToSignup />
          </Box>
        </Grid>
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
