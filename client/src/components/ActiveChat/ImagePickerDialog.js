import React, { useState } from "react";
import { Dialog, DialogTitle } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    border: "solid red 1px",
 
  },
  input: {
    border: "solid red 1px",
     
  },
  photoIcon: {

  }
}));

export default function ImagePickerDialog(props) {
  const { selectedImageFiles, open, onClose } = props

  const [selectedImages, setSelectedImages] = useState([...selectedImageFiles])
  
  const handleClose = () => {
    onClose(selectedImageFiles);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const confirmImageSelection = (value) => {
  };

  const addImageToSelection = (value) => {
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select images to send</DialogTitle>


      
    </Dialog>
  )

}




