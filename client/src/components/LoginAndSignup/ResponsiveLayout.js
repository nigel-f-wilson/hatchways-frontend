import React from "react";
import { Grid, Box, Paper } from "@material-ui/core";

import WelcomeHeader from "./WelcomeHeader";
import { Link } from "./Navigation";
import { Form } from "./Form";
import { useScreenWidth } from "../../hooks";

import useStyles from "./styles";

export function ResponsiveLayout(props) {
  const classes = useStyles();
  const width = useScreenWidth()
  const { page, login, register } = props

  let layout = (width > 850) ? "desktop" : "mobile"

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
          <Link page={page} />
        </Box>
      </Grid>
    );
  }
  else if (layout === "mobile") {
    return (
      <Box className={classes.mobileRoot} >
        <WelcomeHeader className={classes.mobileHeader} />
        <Paper className={classes.mobilePaper} >
          <Form
            formType={page}
            login={login}
            register={register}
          />
          <Link page={page} />
        </Paper>
      </Box>
    );
  }
}
