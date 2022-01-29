import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

import bgImage from "../../assets/bg-img.png";
import chatBubbleIcon from "../../assets/bubble.svg";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center",
    backgroundSize: "cover",
  },
  gradient: {
    height: "100%",
    background: `linear-gradient(180deg, rgba(58, 141, 255, 0.85) 0%, rgba(134, 185, 255, 0.85) 100%)`
  },
  iconTextOverlay: {
    height: "100%",
    color: theme.palette.common.white,
    padding: "48% 22%"
  },
  icon: {
    color: theme.palette.common.white,
    padding: "15% 50%",
    marginBottom: "3rem",
    background: `url(${chatBubbleIcon}) no-repeat center/contain`,
  },
}));

const WelcomeHeader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.image} >
      <Box className={classes.gradient} >
        <Box className={classes.iconTextOverlay} >
          <Box className={classes.icon} />
          <Typography variant="h1"
            align="center"
            children="Converse with anyone with any language" 
          />
        </Box>
      </Box>
    </Box>
  )
}

export default WelcomeHeader 