import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import Message from "./Message";

const useStyles = makeStyles(() => ({
  messageArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
}));

const SenderMessage = (props) => {
  const classes = useStyles();
  const { time, message } = props;
  
  return (
    <Box className={classes.messageArea} >
      <Message time={time} message={message} />
    </Box>
  )
};

export default SenderMessage;
