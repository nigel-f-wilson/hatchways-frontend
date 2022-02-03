import React, { useState } from "react";
import { Dialog, DialogTitle, Box, Input, Button, Typography, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles((theme) => ({
  root: {
    border: "solid red 1px",
 
  },
  input: {
    border: "solid red 1px",
     
  },
  photoIcon: {

  },
  form: {
    // [type = "file"]: {
    //   fontSize: "1em",
    //   padding: "1em",
    //   border: "solid 1px gray",
    //   borderRadius: ".5em",
    // },
    button: {
      color: "white",
      fontSize: "1em",
      backgroundColor: "blueviolet",
      padding: ".5em .8em",
      border: "none",
      borderRadius: ".2em",
    },
    code: {
      textAlign: "left",
    },
  },
  dialog: {

  },
  paper: {
    height: "80vh",
    width: "min(80vw, 500px)",
    padding: "1rem",


  },
  preview: {
    margin: "1rem 0",
    height: "90%",

  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  fileInput: {
    border: "solid red 2px",
    
  },
  button: {
    minHeight: "2rem",
    width: "35%",
    backgroundColor: theme.palette.primary.main,
    color: "#fff"
  }
}));

export default function ImagePickerDialog(props) {
  const classes = useStyles();
  const { open, 
    onClose, 
    selectedImageURLs,
    selectedImageData, 
    handleImageChange, 
    handleImageUpload } = props

  


  const handleClose = () => {
    onClose(selectedImageURLs);
  };

  

  // async function handleOnSubmit(event) {
  //   event.preventDefault();

  //   const form = event.currentTarget;
  //   const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

  //   console.log('fileInput', fileInput);
  // }

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const confirmImageSelection = (value) => {
  };

  const addImageToSelection = (value) => {
  };

  return (
    <Dialog open={open}
      onClose={handleClose}
      PaperProps={{ className: classes.paper }}
    >
      <DialogTitle disableTypography >
        <Typography variant="h4" children="Select images to send" />
      </DialogTitle>
      
      <ImagePreview
        selectedImageURLs={selectedImageURLs}

      />

      <Box className={classes.row} >
        {/* <Input
          type="file"
          name="file"
          className={classes.fileInput}
          onChange={handleImageChange}
        /> */}
        {/* <Button className={classes.button} htmlFor="file-upload" 
        >
          
          Choose an Image
        </Button>
        <input
          type="file"
          id="file-upload"
          // style={{ display: "none" }}
          onChange={handleImageChange}

        /> */}
        <label htmlFor="upload-photo">
          <input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
          />
          <Fab
            // color="secondary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
          >
            <AddIcon /> Upload photo
          </Fab>
        </label>

        {/* <form className={classes.form} 
        method="post" 
        onChange={handleImageChange} 
        onSubmit={handleImageUpload}
      > 
        <img src={selectedImageURLs} />
      </form> */}


        <Button
          className={classes.button}
          children="Upload Files"
          disabled={!(selectedImageURLs && !selectedImageData)}
          onClick={handleImageUpload}
        />
      </Box>

      {selectedImageData && (
        <code><pre>{JSON.stringify(selectedImageData, null, 2)}</pre></code>
      )}
      
    </Dialog>
  )

}

function ImagePreview(props) {
  const classes = useStyles()
  const { selectedImageURLs } = props

  const message = (selectedImageURLs) ? "" : `No Images Selected` 
  const background = `center top / contain no-repeat url(${selectedImageURLs})`

  
  return (
    <Box 
      className={classes.preview}
      children={message}
      style={{ background: background }}
    />

  )
}



