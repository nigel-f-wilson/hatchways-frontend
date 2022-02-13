import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";
import Message from "./Message";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
}));

const OtherUserMessage = (props) => {
  const classes = useStyles();
  const { message, time, otherUser } = props;

  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <Message time={time} message={message} otherUser={otherUser} />
      </Box>
    </Box>
  );
};

export default OtherUserMessage;
