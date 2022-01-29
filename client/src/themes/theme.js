import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    h1: {
      fontWeight: "400",
      fontSize: "26px",
      lineHeight: "40px"
    },
    h2: {
      fontSize: "26px",

      letterSpacing: 0,
      fontWeight: "bold"
    },
    button: {
      textTransform: "none",
      letterSpacing: 0.25,
      fontWeight: 600,
      fontSize: ".95rem"
    }
  },
  overrides: {
    Mui: {
      focused: {
        color: "#b0b0b0"
      },
    },
    MuiInput: {
      input: {
        fontWeight: "bold",
        paddingTop: "20px"
      }
    },
    MuiInputLabel: {
      root: {
        color: "#b0b0b0"
      },
      focused: {
        color: "#b0b0b0"
      },
      root: {
        color: "#b0b0b0"
      },
    },
    MuiFormLabel: {
      asterisk: {
        color: "transparent"
      }
    } 
    
  },
  palette: {
    primary: { 
      light: "#7dbdff",
      main: "#3A8DFF",
      dark: "#0061cb",
      contrastText: "#fff"

    },
    secondary: { 
      main: "#B0B0B0",
      contrastText: "#fff"
    }
  }
});

