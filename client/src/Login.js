import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, } from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";

import WelcomeHeader from "./components/LoginAndSignup/WelcomeHeader";
import { LinkToSignup } from "./components/LoginAndSignup/Navigation";
import { LoginForm } from "./components/LoginAndSignup/Forms";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden"
  },
  formArea: {
    display: "flex",
    alignItems: "center"
  },
  topRight: {
    height: "60px",
    position: "absolute",
    top: "2rem",
    right: "3rem",    
  },
  button: {
    marginLeft: "2rem",
    backgroundColor: theme.palette.common.white,
    borderColor: theme.palette.primary.main
  },

}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
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

  return (
    <Grid container className={classes.root}  >
      <Grid item xs={5} >
        <WelcomeHeader />
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={5} className={classes.formArea} >
        <LoginForm handleLogin={handleLogin} />
      </Grid>
      <Box className={classes.topRight} >
        <LinkToSignup  />
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
