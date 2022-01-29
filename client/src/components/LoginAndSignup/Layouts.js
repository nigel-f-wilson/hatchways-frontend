import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";

import WelcomeHeader from "./WelcomeHeader";
import { LinkToLogin, LinkToSignup } from "./Navigation";
import { LoginForm, SignupForm } from "./Forms";

import useStyles from "./styles";

export function ResponsiveLayout(props) {
  const classes = useStyles();
  const { layout, page, login, register } = props

  let form = getForm(page)
  function getForm(page) {
    if (page === "signup") {
      return <SignupForm register={register} />
    } else if (page === "login") {
      return <LoginForm login={login} />
    } else { console.error("DesktopLayout recieved invalid page prop.") }
  }

  let navigation = getNavigation(page)
  function getNavigation(page) {
    if (page === "signup") {
      return <LinkToLogin />
    } else if (page === "login") {
      return <LinkToSignup />
    } else {
      console.error("DesktopLayout recieved invalid page prop.")
    }
  }

  if (layout === "desktop") {
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
  else if (layout === "mobile") {
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
}
