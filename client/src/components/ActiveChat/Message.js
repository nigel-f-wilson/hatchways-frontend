import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  time: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
    overflowWrap: "break-word"
  },
  senderText: {
    color: "#91A3C0",
  },
  recipientText: {
    color: "#FFFFFF",
  },
  senderBubbleWrapper: {
    backgroundColor: "#eee",
    backgroundSize: "cover",
    overflow: "hidden",
    borderRadius: "10px 10px 0 10px",
    margin: 4,
    maxWidth: "450px",
  },
  recipientBubbleWrapper: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
    overflow: "hidden",
    margin: 4,
    maxWidth: "450px"
  },
  pictureHeader: (props) => ({
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "300px",
    minHeight: "200px",
    backgroundImage: `url(${props.url})`,
    display: `${props.pictureDisplay}`,
  }),
  pictureBubble: {
    backgroundSize: "cover",
    minWidth: "200px",
    maxWidth: "200px",
    minHeight: "200px"
  },
  pictureRow: {
    display: "flex",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    maxWidth: "650px"
  },
});

const Message = (props) => {
  const { time, message, otherUser } = props
  const { text, attachments } = message

  const type = (otherUser) ? "recipient" : "sender"

  let url = (attachments?.length === 1) ? attachments[0] : null  
  let pictureDisplay = (url === null) ? "none" : "flex"
  
  return (
    <>
      <TimeString 
        type={type}
        time={time}
        otherUser={otherUser}
      />
      <TextBubble 
        type={type}
        url={url}
        text={text}
        pictureDisplay={pictureDisplay}
      />
      <PictureRow 
        attachments={attachments}
        type={type} 
      />
    </>
  )
}

const TimeString = (props) => {
  const classes = useStyles(props)
  const { type, time, otherUser } = props
  return (type === "sender") ? (
    <Typography className={classes.time}>{time}</Typography>
  ) : (
    <Typography className={classes.time}>{otherUser.username} {time}</Typography>
  )
}

const TextBubble = (props) => {
  const classes = useStyles(props);
  const { type, url, text, pictureDisplay } = props

  const bubbleClassName = (type === "sender") ? classes.senderBubbleWrapper : classes.recipientBubbleWrapper
  const textClassName = (type === "sender") ? [classes.text, classes.senderText] : [classes.text, classes.recipientText]

  return (
    <Box className={bubbleClassName}>
      <Box className={classes.pictureHeader} url={url} pictureDisplay={pictureDisplay} />
      <Typography className={textClassName}>{text}</Typography>
    </Box>
  )
}

const PictureRow = (props) => {
  const classes = useStyles(props);
  const { attachments, type } = props
  const bubbleClassName = (type === "sender") ? classes.senderBubbleWrapper : classes.recipientBubbleWrapper

  return (
    <Box className={classes.pictureRow} >
      {attachments && attachments.length > 1 && attachments.map(url =>
        <Box key={url} className={bubbleClassName}  >
          <Box className={classes.pictureBubble} style={{ backgroundImage: `url(${url})` }} />
        </Box>
      )}
    </Box>
  )
}

export default Message