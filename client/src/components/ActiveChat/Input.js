import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

import { FormControl, FilledInput, Icon, IconButton} from "@material-ui/core";
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import ImagePickerDialog from "./ImagePickerDialog";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
    
  },
  row:{
    marginBottom: 20,
    display: "flex",
    flexDirection: "row"
  },
  input: {
    flex: "2 0 80%",
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
  },
  photoIcon: {
    margin: "0 0.5rem"
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const { postMessage, otherUser, conversationId, user } = props;

  const [text, setText] = useState("");
  // const [imagePickerOpen, setImagePickerOpen] = React.useState(false);

  const [selectedImageURLs, setSelectedImageURLs] = useState()  
  const [selectedImageData, setSelectedImageData] = useState()
  
  const fileInput = useRef();
  
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  
  // this is the original handelSubmit method.
  // It needs adapted to be able to use with image sender
  const handleSubmit = async (event) => {
    event.preventDefault();


    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
    console.log('fileInput', fileInput);

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user
    };
    await postMessage(reqBody);
    setText("");
  };

  function handleImageChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setSelectedImageURLs(onLoadEvent.target.result);
      setSelectedImageData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const handleImageUpload = async (event) => {
    event.preventDefault();


    const form = event.currentTarget;
    console.log('form', form);
    // const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
    // console.log('fileInput', fileInput);

    
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl hiddenLabel className={classes.row}>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleTextChange}
          
          
          // autoComplete="false"
        />
        <IconButton 
          className={classes.photoIcon}
          children={<PhotoLibraryIcon fontSize="large" />}
          aria-label="send a photo" 
          // onClick={openImagePicker}
          // onClick={openImagePicker}
          onClick={() => fileInput.current.click()}

        />
        <input 
          ref={fileInput}
          type="file"
          multiple
          style={{ display: 'none' }} 
        />

        
      </FormControl>
      {/* <ImagePickerDialog
        open={imagePickerOpen}
        onClose={closeImagePicker}
        selectedImageURLs={selectedImageURLs}
        selectedImageData={selectedImageData}
        handleImageChange={handleImageChange}
        handleImageUpload={handleImageUpload}
      /> */}

    </form>
  );
};
 



const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
