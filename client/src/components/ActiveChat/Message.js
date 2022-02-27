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
  text: (props) => ({
    fontSize: 14,
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
    overflowWrap: "break-word",
    color: (props.type === "sender") ? "#91A3C0" : "#FFFFFF",
  }),
  bubble: (props) => ({
    backgroundImage: (props.type === "sender") ? "" : "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)" ,
    backgroundColor: (props.type === "sender") ? "#eee" : "",
    borderRadius: (props.type === "sender") ? "10px 10px 0 10px" : "0 10px 10px 10px",
    margin: 4,
    maxWidth: "450px",

  }),
  pictureHeader: (props) => ({
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "300px",
    minHeight: "200px",
    backgroundImage: `url(${props.url})`,
    display: `${props.pictureDisplay}`,
  }),
  pictureRow: {
    display: "flex",
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    maxWidth: "650px"
  },
  pictureBubble: (props) => ({
    borderRadius: (props.type === "sender") ? "10px 10px 0 10px" : "0 10px 10px 10px",
    backgroundImage: `url(${props.url})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    margin: 4,
    display: "flex",
    backgroundSize: "cover",
    minWidth: "200px",
    maxWidth: "200px",
    minHeight: "200px",
  }),
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

  return (
    <Box className={classes.bubble}>
      <Box className={classes.pictureHeader} url={url} pictureDisplay={pictureDisplay} />
      <Typography className={classes.text}>{text}</Typography>
    </Box>
  )
}
// Use PropTypes to verify props.type is one of "sender" or "recipient"

const PictureRow = (props) => {
  const classes = useStyles(props);
  const { attachments, type } = props
  return (
    <Box className={classes.pictureRow} >
      {attachments && attachments.length > 1 && attachments.map(url =>
        <PictureBubble type={type} key={url} url={url}  />
      )}
    </Box>
  )
}

const PictureBubble = (props) => {
  const classes = useStyles(props);
  const { type, url } = props
  return (
    <Box className={classes.pictureBubble} key={url} url={url} />
  )
}

export default Message