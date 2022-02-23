import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

import { Box, FormControl, FilledInput, IconButton} from "@material-ui/core";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

const useStyles = makeStyles(() => ({
  inputPreviewContainer: {
    justifySelf: "flex-end",
    marginTop: 15,
    maxHeight: "30rem",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    border: "solid #CCC 3px",
    padding: 8
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    flex: "2 0 80%",
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
  },
  photoIcon: {
    margin: "0 0.5rem"
  },
  previewThumbnail: {
    maxHeight: "9rem",
    maxWidth: "8rem",
    backgroundSize: "cover",
    marginRight: 8,
    marginBottom: 8
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const { postMessage, otherUser, conversationId, user } = props;

  const [text, setText] = useState("");
  const [selectedImageURLs, setSelectedImageURLs] = useState([])  
  
  const fileInput = useRef();
  
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  
  function handleImageChange(changeEvent) {
    const files = Array.from(changeEvent.target.files)
    let readFileData = []
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = function (onLoadEvent) {
        let loadEventResult = onLoadEvent.target.result
        readFileData = readFileData.concat(loadEventResult)
        setSelectedImageURLs(readFileData);
      }
      reader.readAsDataURL(file)
    })
  }

  // this is the original handelSubmit method.
  // It needs adapted to be able to use with image sender
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    let secureURLs = null
    if (selectedImageURLs.length > 0) {
      secureURLs = await uploadFilesToCloudinary(selectedImageURLs)
    }
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: secureURLs
    };
    await postMessage(reqBody);
    setText("");
    setSelectedImageURLs([]);
  };

  async function uploadFilesToCloudinary(filesArray) {
    let secureURLs = []
    for (let i = 0; i < filesArray.length; i++) {
      const formDataForCloudinary = new FormData()
      formDataForCloudinary.append("file", filesArray[i])
      formDataForCloudinary.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      
      const requestResponseData = await fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, {
        method: 'POST',
        body: formDataForCloudinary
      }).then(res => res.json())

      console.log("DATA: ", requestResponseData);
      secureURLs = secureURLs.concat(requestResponseData.secure_url)
    }
    setSelectedImageURLs([])
    return secureURLs
  }

  return (
    <form 
      className={classes.inputPreviewContainer}
      onSubmit={handleFormSubmit}
    >
      <FormControl hiddenLabel >
        <ImagePreviewArea 
          imageURLs={selectedImageURLs}
        />
        <Box className={classes.row} >
          <FilledInput
            className={classes.input}
            disableUnderline
            placeholder="Type something..."
            value={text}
            name="text"
            onChange={handleTextChange}
          />
          <IconButton
            className={classes.photoIcon}
            children={<ContentCopyOutlinedIcon fontSize="large" />}
            aria-label="send a photo"
            onClick={() => fileInput.current.click()}
          />
          <input
            ref={fileInput}
            type="file"
            name="file"
            multiple
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </Box>
      </FormControl>
    </form>
  );
};
 
function ImagePreviewArea(props) {
  const classes = useStyles();
  const { imageURLs } = props
  return (
    <Box>
      { imageURLs.map(url => <img key={url.toString()} src={url} className={classes.previewThumbnail} alt="uploaded preview" />) }
    </Box>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
