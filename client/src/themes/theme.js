import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    h1: {
      fontWeight: "400",
      fontSize: "26px",
      lineHeight: "40px"
    },
    h2: {
      letterSpacing: 0,
      fontWeight: "bold"
    },
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    },
    MuiButtonBase: {
      root: {
        boxSizing: "border-box",
      },
    },
    MuiButton: {
      root: {
        boxSizing: "border-box",
      },
      contained: {
        height: "100%",
        margin: 0,
        "&:hover": {
          border: "solid 2px",
          backgroundColor: "#FFF"
        }
      }

      
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { 
      main: "#B0B0B0",
      contrastText: "#fff"
    }
  }
});
