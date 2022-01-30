import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";

import WelcomeHeader from "./WelcomeHeader";
import { LinkToLogin, LinkToSignup } from "./Navigation";
import { Form } from "./Form";
import { useScreenWidth } from "../../hooks";

import useStyles from "./styles";

export function ResponsiveLayout(props) {
  const classes = useStyles();
  const width = useScreenWidth()
  const { page, login, register } = props

  let layout = (width > 850) ? "desktop" : "mobile"

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
          <Form
            formType={page}
            login={login}
            register={register}
          />
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
          {navigation}
          <Form
            formType={page}
            login={login}
            register={register}
          />
        </Paper>
      </Box>
    );
  }
}
