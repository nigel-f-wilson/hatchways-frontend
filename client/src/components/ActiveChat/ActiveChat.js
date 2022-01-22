import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

// Need to write comparator for array.sort to use that handles date-times
// Testing data:
// let earlierDate = "2022-01-21T01:07:54.777Z"
// let laterDate = "2022-01-21T01:07:54.888Z"
function compareDates(dateOne,dateTwo) {
  console.assert(typeof(dateOne) === "string" && typeof(dateTwo) === "string");
  for (let i = 0; i < dateOne.length; i++) {
    if (dateOne[i] < dateTwo[i]) {
      return -1
    }
    if (dateOne[i] > dateTwo[i]) {
      return 1
    }
  }
  return 0
}
const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};

  const messages = (conversation.messages) ? [...conversation.messages].sort((a, b) => compareDates(a.createdAt, b.createdAt)) : []
  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
