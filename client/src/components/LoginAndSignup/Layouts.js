import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";

import WelcomeHeader from "./WelcomeHeader";
import { LinkToLogin, LinkToSignup } from "./Navigation";
import { LoginForm, SignupForm } from "./Forms";

import useStyles from "./styles";

export function DesktopLayout(props) {
  const classes = useStyles();
  const { page, login, register} = props

  const form = getForm(page)
  function getForm(page) {
    if (page === "signup") {
      return <SignupForm register={register} />
    } else if (page === "login") {
      return <LoginForm login={login} />
    } else { console.error("DesktopLayout recieved invalid page prop.") } 
  } 

  const navigation = getNavigation(page)
  function getNavigation(page) {
    if (page === "signup") {
      return <LinkToLogin />
    } else if (page === "login") {
      return <LinkToSignup />
    } else { 
      console.error("DesktopLayout recieved invalid page prop.") 
    }
  } 
  
  return (
    <Grid container className={classes.desktopRoot} >
      <Grid item xs={5} className={classes.desktopSidebar} >
        <WelcomeHeader />
      </Grid>
      <Grid item xs={1} md={false} />
      <Grid item xs={5} className={classes.desktopFormArea} >
        {form}
      </Grid>
      <Box className={classes.topRight} >
        {navigation}
      </Box>
    </Grid>
  );
}

export function MobileLayout(props) {
  const classes = useStyles();
  
  const { page, login, register } = props

  const form = getForm(page)
  function getForm(page) {
    if (page === "signup") {
      return <SignupForm register={register} />
    } else if (page === "login") {
      return <LoginForm login={login} />
    } else { console.error("DesktopLayout recieved invalid page prop.") }
  }

  const navigation = getNavigation(page)
  function getNavigation(page) {
    if (page === "signup") {
      return <LinkToLogin />
    } else if (page === "login") {
      return <LinkToSignup />
    } else {
      console.error("DesktopLayout recieved invalid page prop.")
    }
  } 

  return (
    <Box className={classes.mobileRoot} >
      <WelcomeHeader className={classes.mobileHeader} />
      <Paper className={classes.mobilePaper} >
        {form}
        {navigation}
      </Paper>
    </Box>
  );
}

 