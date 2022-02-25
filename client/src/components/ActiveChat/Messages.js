import React from "react";
import { Box } from "@material-ui/core";
import SenderMessage from "./SenderMessage";
import OtherUserMessage from "./OtherUserMessage";

import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  
  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderMessage 
            key={message.id} 
            message={message} 
            time={time} 
          />
        ) : (
          <OtherUserMessage 
            key={message.id} 
            message={message} 
            time={time} 
            otherUser={otherUser} 
          />
        );
      })}
    </Box>
  );
};

export default Messages;
